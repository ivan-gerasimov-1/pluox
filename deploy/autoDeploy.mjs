import { spawn } from 'node:child_process';
import { buildImage } from './buildImage.mjs';
import { captureRelease } from './releaseHistory.mjs';
import { readFile, writeFile, chmod, rename } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

export async function main() {
	let identity = pipelineIdentity(process.env);
	let { sha, number, manualDeployment } = identity;
	let source = resolve(dirname(fileURLToPath(import.meta.url)), '..');
	let head = await command('git', ['-C', source, 'rev-parse', 'HEAD'], {
		capture: true,
	});
	if (head !== sha)
		throw new Error('Checkout HEAD does not match CI_COMMIT_SHA.');
	let controller = new AbortController();
	let cancel = () => controller.abort(new Error('Deployment interrupted.'));
	process.on('SIGTERM', cancel);
	process.on('SIGINT', cancel);
	try {
		// The workflow holds the host flock for this process and all Docker commands.
		let action = deploy;
		if (identity.rollback) action = (await import('./rollback.mjs')).rollback;
		await action({
			state: '/opt/pluox',
			source,
			sha,
			number,
			manualDeployment,
			targetSha: identity.targetSha,
			apiOrigin: process.env.PLUOX_API_ORIGIN,
			signal: controller.signal,
		});
	} finally {
		process.off('SIGTERM', cancel);
		process.off('SIGINT', cancel);
	}
}

export function pipelineIdentity(env) {
	let manualDeployment = env.CI_PIPELINE_EVENT === 'deployment';
	let allowedEvent =
		env.CI_PIPELINE_EVENT === 'push' ||
		(manualDeployment &&
			env.CI_PIPELINE_DEPLOY_TARGET === 'production' &&
			['deploy', 'rollback'].includes(env.CI_PIPELINE_DEPLOY_TASK));
	if (
		!allowedEvent ||
		env.CI_COMMIT_BRANCH !== 'main' ||
		env.CI_REPO !== 'ivan-gerasimov-1/pluox'
	) {
		throw new Error(
			'Deployment requires main: push or deployment with target production and task deploy or rollback.',
		);
	}
	let sha = env.CI_COMMIT_SHA ?? '';
	let number = Number(env.CI_PIPELINE_NUMBER);
	if (
		!/^[0-9a-f]{40}$/u.test(sha) ||
		!/^\d+$/u.test(env.CI_PIPELINE_NUMBER ?? '') ||
		!Number.isSafeInteger(number) ||
		number < 1
	) {
		throw new Error('Invalid commit SHA or pipeline number.');
	}
	if (manualDeployment && env.CI_PIPELINE_DEPLOY_TASK === 'rollback') {
		let targetSha = env.PLUOX_ROLLBACK_SHA;
		if (targetSha && !/^[a-f0-9]{40}$/u.test(targetSha))
			throw new Error('Invalid rollback SHA.');
		return {
			sha,
			number,
			manualDeployment: true,
			rollback: true,
			...(targetSha ? { targetSha } : {}),
		};
	}
	return manualDeployment
		? { sha, number, manualDeployment: true }
		: { sha, number };
}

export async function deploy({
	state,
	source,
	sha,
	number,
	manualDeployment = false,
	apiOrigin,
	signal,
	run = command,
	check = checkApplication,
}) {
	apiOrigin = validateApiOrigin(apiOrigin);
	let marker = join(state, 'release.json');
	try {
		let release = JSON.parse(await readFile(marker, 'utf8'));
		if (release.pipeline >= number) {
			console.log('Skipping a pipeline at or below the deployed release.');
			return;
		}
	} catch (error) {
		if (error.code !== 'ENOENT') throw error;
	}
	if (manualDeployment) {
		// Check after acquiring the host lock: a selected pipeline may now be stale.
		let head = await run(
			'git',
			['-C', source, 'ls-remote', 'origin', 'refs/heads/main'],
			{ capture: true, signal },
		);
		if (head !== `${sha}\trefs/heads/main`) {
			throw new Error(
				'Select a successful pipeline for the current main commit; older commits cannot be deployed here.',
			);
		}
	}
	let oldEnv = await readFile(join(state, '.env'), 'utf8');
	let oldMarker;
	try {
		oldMarker = JSON.parse(await readFile(marker, 'utf8'));
	} catch (error) {
		if (error.code !== 'ENOENT') throw error;
	}
	let oldCompose = await readFile(join(state, 'compose.yaml'), 'utf8');
	if (
		!/^PLUOX_IMAGE=\S+\n?(?:PLUOX_API_ORIGIN=https:\/\/\S+\n?)?$/u.test(oldEnv)
	) {
		throw new Error(
			'Expected .env to contain PLUOX_IMAGE and optional PLUOX_API_ORIGIN.',
		);
	}
	let oldRelease = null;
	if (/^[a-f0-9]{40}$/u.test(oldMarker?.sha ?? ''))
		oldRelease = await captureRelease({
			state,
			sha: oldMarker.sha,
			env: oldEnv,
			compose: oldCompose,
			run,
		});
	let image = `pluox/web:${sha}`;
	signal?.throwIfAborted();
	await buildImage({ image, source, run, signal });
	try {
		signal?.throwIfAborted();
		await atomicWrite(
			join(state, '.env'),
			`PLUOX_IMAGE=${image}\nPLUOX_API_ORIGIN=${apiOrigin}\n`,
		);
		await atomicWrite(
			join(state, 'compose.yaml'),
			await readFile(join(source, 'deploy/compose.yaml'), 'utf8'),
		);
		await compose(run, state, ['config', '--quiet'], { signal });
		await compose(run, state, ['up', '-d', '--wait', '--wait-timeout', '120'], {
			signal,
		});
		await check({ state, run, signal });
		signal?.throwIfAborted();
		await captureRelease({
			state,
			sha,
			env: `PLUOX_IMAGE=${image}\nPLUOX_API_ORIGIN=${apiOrigin}\n`,
			compose: await readFile(join(state, 'compose.yaml'), 'utf8'),
			run,
		});
		await atomicWrite(
			join(state, 'previous.release.json'),
			JSON.stringify(oldRelease) + '\n',
		);
		await atomicWrite(join(state, 'previous.env'), oldEnv);
		await atomicWrite(join(state, 'previous.compose.yaml'), oldCompose);
		signal?.throwIfAborted();
		await atomicWrite(
			marker,
			JSON.stringify({ pipeline: number, sha, image }) + '\n',
		);
	} catch (error) {
		console.error('Deployment failed; restoring the previous release.');
		try {
			await compose(run, state, ['logs', '--no-color', '--tail', '80', 'web']);
		} catch {
			console.error('Could not collect container logs.');
		}
		await atomicWrite(join(state, '.env'), oldEnv);
		await atomicWrite(join(state, 'compose.yaml'), oldCompose);
		// Rollback must remain runnable after the deployment signal is aborted.
		await compose(run, state, ['up', '-d', '--wait', '--wait-timeout', '120']);
		throw error;
	}
	console.log(`Deployed frontend from ${sha}.`);
}

export async function checkApplication({
	state,
	run = command,
	request = fetch,
	signal,
}) {
	let container = await compose(run, state, ['ps', '-q', 'web'], {
		capture: true,
		signal,
	});
	if (!container) throw new Error('No running frontend container.');
	async function get(path) {
		return run(
			'docker',
			[
				'exec',
				container,
				'curl',
				'--fail',
				'--silent',
				'--show-error',
				'--max-time',
				'30',
				`http://127.0.0.1:8080${path}`,
			],
			{ capture: true, signal },
		);
	}
	if (
		(await get('/healthz')) !== 'ok' ||
		!(await get('/settings')).toLowerCase().includes('<!doctype html')
	) {
		throw new Error('Frontend health or SPA check failed.');
	}
	if (!JSON.parse(await get('/api/currencies')).rates?.USD) {
		throw new Error('The API proxy did not return currency rates.');
	}
	let status = await run(
		'docker',
		[
			'exec',
			container,
			'curl',
			'--silent',
			'--show-error',
			'--max-time',
			'15',
			'--output',
			'/dev/null',
			'--write-out',
			'%{http_code}',
			'http://127.0.0.1:8080/assets/pluox-missing-asset.js',
		],
		{ capture: true, signal },
	);
	if (status !== '404') throw new Error('Missing assets must return 404.');
	for (let path of ['/healthz', '/api/currencies']) {
		let signals = [AbortSignal.timeout(30000)];
		if (signal) signals.push(signal);
		let response = await request(`https://pld.gerasimov.dev${path}`, {
			signal: AbortSignal.any(signals),
		});
		if (!response.ok)
			throw new Error(
				`Public HTTPS check failed: ${path} (${response.status}).`,
			);
		let body = await response.text();
		if (path === '/healthz' && body.trim() !== 'ok')
			throw new Error('Public healthcheck failed.');
		if (path === '/api/currencies' && !JSON.parse(body).rates?.USD) {
			throw new Error('Public API check failed.');
		}
	}
}

export function command(
	program,
	args,
	{ capture = false, signal, env = process.env } = {},
) {
	return new Promise((resolveCommand, reject) => {
		let child = spawn(program, args, {
			env,
			signal,
			stdio: ['ignore', capture ? 'pipe' : 'inherit', 'inherit'],
		});
		let output = '';
		let failure;
		child.stdout?.setEncoding('utf8').on('data', (chunk) => {
			output += chunk;
		});
		child.on('error', (error) => {
			failure = error;
		});
		// Wait for close even on abort so rollback cannot race an unfinished Compose command.
		child.on('close', (code) => {
			if (failure || code !== 0)
				reject(failure ?? new Error(`${program} exited with status ${code}.`));
			else resolveCommand(output.trim());
		});
	});
}

export async function atomicWrite(path, text) {
	await writeFile(path + '.new', text);
	await chmod(path + '.new', 0o644);
	await rename(path + '.new', path);
}

export function compose(run, state, args, options) {
	let env = { ...process.env };
	// Compose must use the saved release configuration, including during rollback.
	delete env.PLUOX_API_ORIGIN;
	delete env.PLUOX_IMAGE;
	return run(
		'docker',
		[
			'compose',
			'--project-name',
			'pluox',
			'--env-file',
			join(state, '.env'),
			'-f',
			join(state, 'compose.yaml'),
			...args,
		],
		{ ...options, env },
	);
}

export function validateApiOrigin(value) {
	try {
		let url = new URL(value);
		if (
			url.protocol === 'https:' &&
			!url.username &&
			!url.password &&
			(value === url.origin || value === url.origin + '/')
		)
			return url.origin;
	} catch {}
	throw new Error(
		'Set PLUOX_API_ORIGIN to an HTTPS origin without credentials, path, or query.',
	);
}

if (
	process.argv[1] &&
	pathToFileURL(resolve(process.argv[1])).href === import.meta.url
) {
	main().catch((error) => {
		console.error(error.message);
		process.exitCode = 1;
	});
}
