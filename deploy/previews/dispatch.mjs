import { mkdir, readFile, writeFile, rename } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { listPulls, selectPulls, passed, github } from './controller.mjs';

// Only this trusted main workflow may receive a dispatch. No PR-provided commands or refs.
export function woodpecker({ origin, token, repository, request = fetch }) {
	let url = new URL(origin);
	if (
		url.protocol !== 'https:' ||
		url.username ||
		url.password ||
		url.pathname !== '/'
	)
		throw new Error('Set an HTTPS Woodpecker origin.');
	if (!token || !/^[1-9]\d*$/u.test(repository ?? ''))
		throw new Error('Set the Woodpecker token and numeric repository ID.');
	return async (path, body) => {
		let response = await request(
			`${url.origin}/api/repos/${repository}/${path}`,
			{
				method: body ? 'POST' : 'GET',
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json',
				},
				...(body ? { body: JSON.stringify(body) } : {}),
				signal: AbortSignal.timeout(30000),
			},
		);
		if (!response.ok)
			throw new Error(`Woodpecker returned ${response.status}.`);
		return response.json();
	};
}

export async function dispatch({ state, ci, api = github }) {
	await mkdir(state, { recursive: true });
	let selected = selectPulls(await listPulls(api));
	let applied = await readState(join(state, 'applied.json'), []);
	let file = join(state, 'pipelineDispatch.json');
	let previous = await readState(file, undefined);
	let retry;
	if (previous) {
		let pipeline = await ci(`pipelines/${previous.number}`);
		if (['pending', 'running', 'blocked'].includes(pipeline.status)) return;
		if (pipeline.status !== 'success') retry = previous.target;
	}
	let desired = [];
	for (let pr of selected) {
		let status = await api(`commits/${pr.head.sha}/status`);
		desired.push({
			number: pr.number,
			sha: pr.head.sha,
			ready: passed(status),
		});
	}
	let target = nextTarget({ desired, applied, retry });
	if (!target) return;
	let prefix = target.action === 'remove' ? 'Remove preview' : 'Preview';
	let message = `${prefix} PR #${target.number} · ${target.sha.slice(0, 8)}`;
	let pipeline = await ci('pipelines', {
		branch: 'main',
		variables: {
			PLUOX_PREVIEW_RECONCILE: 'true',
			PLUOX_PREVIEW_ACTION: target.action,
			PLUOX_PREVIEW_PR: String(target.number),
			PLUOX_PREVIEW_SHA: target.sha,
		},
		message,
	});
	if (!Number.isSafeInteger(pipeline.number) || pipeline.number < 1)
		throw new Error('Invalid Woodpecker pipeline response.');
	await writeFile(
		file + '.new',
		JSON.stringify({ number: pipeline.number, target }) + '\n',
		{ mode: 0o600 },
	);
	await rename(file + '.new', file);
	console.log(`${message}: Woodpecker pipeline #${pipeline.number}.`);
}

export function nextTarget({ desired, applied, retry }) {
	// Retry failed cleanup even if finalize already persisted applied state.
	if (retry && !desired.some((pr) => pr.number === retry.number))
		return { action: 'remove', number: retry.number, sha: retry.sha };
	if (
		retry?.action === 'deploy' &&
		desired.some(
			(pr) => pr.number === retry.number && pr.sha === retry.sha && pr.ready,
		)
	)
		return retry;
	let obsolete = applied.find(
		(release) => !desired.some((pr) => pr.number === release.number),
	);
	if (obsolete)
		return { action: 'remove', number: obsolete.number, sha: obsolete.sha };
	let pending = desired.find(
		(pr) =>
			pr.ready &&
			!applied.some(
				(release) => release.number === pr.number && release.sha === pr.sha,
			),
	);
	if (pending)
		return { action: 'deploy', number: pending.number, sha: pending.sha };
}

async function readState(file, fallback) {
	try {
		return JSON.parse(await readFile(file, 'utf8'));
	} catch (error) {
		if (error.code === 'ENOENT') return fallback;
		throw error;
	}
}

if (
	process.argv[1] &&
	pathToFileURL(resolve(process.argv[1])).href === import.meta.url
) {
	dispatch({
		state: '/opt/pluox-previews',
		ci: woodpecker({
			origin: process.env.PREVIEW_CI_ORIGIN,
			token: process.env.PREVIEW_CI_TOKEN,
			repository: process.env.PREVIEW_CI_REPOSITORY,
		}),
	}).catch((error) => {
		console.error(error.message);
		process.exitCode = 1;
	});
}
