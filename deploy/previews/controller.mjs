import { mkdir, readFile, writeFile, rename, rm } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { command, validateApiOrigin } from '../autoDeploy.mjs';
import { buildImage } from '../buildImage.mjs';
import { deploymentReporter, reportSafely } from './deployments.mjs';

const REPOSITORY = 'ivan-gerasimov-1/pluox';
const OWNER = 'ivan-gerasimov-1';
const CONTEXT = 'ci/woodpecker/push/woodpecker';
const LABEL = 'dev.pluox.preview=true';
const NO_REPORTER = { send: async () => {}, reconcile: async () => {} };

export function configuration(env) {
	let domain = env.PREVIEW_DOMAIN ?? '';
	if (!/^(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,}$/u.test(domain))
		throw new Error('Set PREVIEW_DOMAIN to a DNS suffix.');
	return {
		domain,
		apiOrigin: validateApiOrigin(env.PLUOX_API_ORIGIN),
		state: '/opt/pluox-previews',
	};
}

export function selectPulls(pulls) {
	return pulls
		.filter(
			(pr) =>
				pr.state === 'open' &&
				!pr.draft &&
				pr.user?.login === OWNER &&
				pr.head?.repo?.full_name === REPOSITORY &&
				pr.base?.repo?.full_name === REPOSITORY &&
				pr.base.ref === 'main' &&
				Number.isInteger(pr.number) &&
				pr.number > 0 &&
				pr.number <= 20000 &&
				/^[a-f0-9]{40}$/u.test(pr.head.sha),
		)
		.sort((a, b) => a.number - b.number)
		.slice(0, 3);
}

export function passed(status) {
	return (
		status.state === 'success' &&
		status.statuses?.some(
			(check) => check.context === CONTEXT && check.state === 'success',
		)
	);
}

export function routes(releases, domain) {
	return (
		releases
			.map(
				(release) =>
					`@pr${release.number} host pr-${release.number}.${domain}\n` +
					`handle @pr${release.number} {\n\theader X-Robots-Tag "noindex, nofollow"\n\treverse_proxy 127.0.0.1:${release.port}\n}\n`,
			)
			.join('\n') + '\nhandle {\n\trespond 404\n}\n'
	);
}

export async function github(path, request = fetch) {
	let headers = {
		Accept: 'application/vnd.github+json',
		'User-Agent': 'pluox-previews',
	};
	if (process.env.PREVIEW_GITHUB_TOKEN)
		headers.Authorization = `Bearer ${process.env.PREVIEW_GITHUB_TOKEN}`;
	let response = await request(
		`https://api.github.com/repos/${REPOSITORY}/${path}`,
		{
			headers,
			signal: AbortSignal.timeout(30000),
		},
	);
	if (!response.ok)
		throw new Error(
			`GitHub returned ${response.status}; keeping previews unchanged.`,
		);
	return response.json();
}

export async function listPulls(api = github) {
	let pulls = [];
	for (let page = 1; page <= 10; page++) {
		let batch = await api(`pulls?state=open&per_page=100&page=${page}`);
		if (!Array.isArray(batch))
			throw new Error('Invalid GitHub pull request response.');
		pulls.push(...batch);
		if (batch.length < 100) return pulls;
	}
	throw new Error('Too many PR pages; refusing incomplete cleanup.');
}

export async function synchronize({
	state,
	domain,
	apiOrigin,
	api = github,
	run = command,
	check = checkPreview,
	reporter = NO_REPORTER,
}) {
	await mkdir(state, { recursive: true });
	let previous = await releases(state, 'applied.json');
	let selected = selectPulls(await listPulls(api));
	let next = [];
	let failures = [];
	for (let pr of selected) {
		let old = previous.find((release) => release.number === pr.number);
		if (old?.sha === pr.head.sha) {
			next.push(old);
			continue;
		}
		let identity = { number: pr.number, sha: pr.head.sha };
		let status = await api(`commits/${pr.head.sha}/status`);
		if (!passed(status)) {
			let failed = ['failure', 'error'].includes(status.state);
			await reportSafely(() =>
				reporter.send(
					identity,
					failed ? 'failure' : 'pending',
					failed ? 'CI checks failed.' : 'Waiting for successful CI checks.',
				),
			);
			if (old) next.push(old);
			continue;
		}
		let port = 20000 + pr.number * 2;
		if (old?.port === port) port++;
		let release = {
			number: pr.number,
			sha: pr.head.sha,
			port,
			container: `pluox-preview-${pr.number}-${pr.head.sha}`,
			image: `pluox/preview:${pr.number}-${pr.head.sha}`,
		};
		try {
			await reportSafely(() =>
				reporter.send(
					identity,
					'in_progress',
					'Building and checking the preview.',
				),
			);
			await buildPreview({ state, release, apiOrigin, run });
			await check({ release, run });
			// A PR can close or receive another commit during a long build.
			let current = await api(`pulls/${pr.number}`);
			if (!selectPulls([current]).length || current.head.sha !== release.sha) {
				await reportSafely(() =>
					reporter.send(
						identity,
						'inactive',
						'PR head changed or PR is no longer eligible.',
					),
				);
				if (old && current.state === 'open') next.push(old);
				continue;
			}
			next.push(release);
			console.log(`Ready: https://pr-${pr.number}.${domain} (${release.sha})`);
		} catch (error) {
			await reportSafely(() =>
				reporter.send(
					identity,
					'failure',
					'Preview build or application checks failed.',
				),
			);
			failures.push(pr.number);
			console.error(`PR #${pr.number}: ${error.message}`);
			if (old) next.push(old);
		}
	}
	await atomic(
		join(state, 'desired.json'),
		JSON.stringify(
			selected.map((pr) => ({ number: pr.number, sha: pr.head.sha })),
		) + '\n',
	);
	await atomic(join(state, 'planned.json'), JSON.stringify(next) + '\n');
	await atomic(join(state, 'routes.caddy'), routes(next, domain));
	if (failures.length)
		throw new Error(
			`Preview reconciliation failed for PRs: ${failures.join(', ')}.`,
		);
}

async function buildPreview({ state, release, apiOrigin, run }) {
	let source = join(state, 'source');
	await rm(source, { recursive: true, force: true });
	await mkdir(source);
	let git = (args, options) => run('git', ['-C', source, ...args], options);
	await git(['init', '--quiet']);
	await git([
		'remote',
		'add',
		'origin',
		`https://github.com/${REPOSITORY}.git`,
	]);
	await git([
		'fetch',
		'--depth=1',
		'origin',
		`refs/pull/${release.number}/head`,
	]);
	let head = await git(['rev-parse', 'FETCH_HEAD'], { capture: true });
	if (head !== release.sha) throw new Error('PR head changed before checkout.');
	await git(['checkout', '--detach', '--quiet', 'FETCH_HEAD']);
	await buildImage({ image: release.image, source, run, preview: true });
	// Recover a candidate left by an interrupted cycle. The applied release has a different SHA.
	let found = await run(
		'docker',
		[
			'ps',
			'-aq',
			'--filter',
			`name=^/${release.container}$`,
			'--filter',
			`label=${LABEL}`,
		],
		{ capture: true },
	);
	if (found) await run('docker', ['rm', '-f', release.container]);
	await run('docker', [
		'run',
		'-d',
		'--name',
		release.container,
		'--label',
		LABEL,
		'--restart',
		'unless-stopped',
		'--read-only',
		'--cap-drop',
		'ALL',
		'--security-opt',
		'no-new-privileges:true',
		'--memory',
		'128m',
		'--cpus',
		'0.5',
		'--pids-limit',
		'100',
		'--log-driver',
		'local',
		'--log-opt',
		'max-size=10m',
		'--log-opt',
		'max-file=2',
		'--tmpfs',
		'/config:uid=10001,gid=10001,mode=0700',
		'--tmpfs',
		'/data:uid=10001,gid=10001,mode=0700',
		'-p',
		`127.0.0.1:${release.port}:8080`,
		'-e',
		`PLUOX_API_ORIGIN=${apiOrigin}`,
		release.image,
	]);
}

export async function checkPreview({ release, run = command }) {
	for (let path of ['/healthz', '/settings', '/api/currencies']) {
		let body = await run(
			'docker',
			[
				'exec',
				release.container,
				'curl',
				'--fail',
				'--silent',
				'--show-error',
				'--retry',
				'15',
				'--retry-connrefused',
				'--retry-delay',
				'2',
				'--max-time',
				'10',
				`http://127.0.0.1:8080${path}`,
			],
			{ capture: true },
		);
		if (path === '/healthz' && body !== 'ok')
			throw new Error('Health check failed.');
		if (path === '/settings' && !body.toLowerCase().includes('<!doctype html'))
			throw new Error('SPA check failed.');
		if (path === '/api/currencies' && !JSON.parse(body).rates?.USD)
			throw new Error('API check failed.');
	}
}

export async function finalize({
	state,
	run = command,
	reporter = NO_REPORTER,
}) {
	let planned = await releases(state, 'planned.json');
	// Persist applied state first. Cleanup is retryable if Docker fails partway through.
	await atomic(join(state, 'applied.json'), JSON.stringify(planned) + '\n');
	for (let release of planned)
		await reportSafely(() =>
			reporter.send(release, 'success', 'Preview is ready.'),
		);
	await reportSafely(async () =>
		reporter.reconcile([
			...planned,
			...(await releases(state, 'desired.json')),
		]),
	);
	let containers = await run(
		'docker',
		['ps', '-a', '--filter', `label=${LABEL}`, '--format', '{{.Names}}'],
		{ capture: true },
	);
	for (let container of containers.split('\n').filter(Boolean)) {
		if (
			/^pluox-preview-\d+-[a-f0-9]{40}$/u.test(container) &&
			!planned.some((release) => release.container === container)
		)
			await run('docker', ['rm', '-f', container]);
	}
	let images = await run(
		'docker',
		['image', 'ls', 'pluox/preview', '--format', '{{.Repository}}:{{.Tag}}'],
		{ capture: true },
	);
	for (let image of images.split('\n').filter(Boolean)) {
		if (
			/^pluox\/preview:\d+-[a-f0-9]{40}$/u.test(image) &&
			!planned.some((release) => release.image === image)
		)
			await run('docker', ['image', 'rm', image]);
	}
	await rm(join(state, 'source'), { recursive: true, force: true });
}

async function releases(state, file) {
	try {
		return JSON.parse(await readFile(join(state, file), 'utf8'));
	} catch (error) {
		if (error.code === 'ENOENT') return [];
		throw error;
	}
}

async function atomic(path, text) {
	await writeFile(path + '.new', text, { mode: 0o644 });
	await rename(path + '.new', path);
}

export async function restore({ state, domain, reporter = NO_REPORTER }) {
	let applied = await releases(state, 'applied.json');
	for (let release of await releases(state, 'planned.json')) {
		if (
			!applied.some(
				(old) => old.sha === release.sha && old.number === release.number,
			)
		)
			await reportSafely(() =>
				reporter.send(
					release,
					'failure',
					'Preview pipeline failed; previous version retained.',
				),
			);
	}
	await atomic(
		join(state, 'routes.caddy'),
		routes(await releases(state, 'applied.json'), domain),
	);
}

if (
	process.argv[1] &&
	pathToFileURL(resolve(process.argv[1])).href === import.meta.url
) {
	let config = configuration(process.env);
	config.reporter = deploymentReporter({
		...config,
		token: process.env.PREVIEW_GITHUB_TOKEN,
		pipelineUrl: process.env.PREVIEW_PIPELINE_URL,
	});
	let action = { sync: synchronize, finalize, restore }[process.argv[2]];
	if (!action) throw new Error('Expected sync, finalize, or restore.');
	action(config).catch((error) => {
		console.error(error.message);
		process.exitCode = 1;
	});
}
