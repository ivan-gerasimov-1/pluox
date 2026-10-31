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
	let desired = [];
	for (let pr of selected) {
		let status = await api(`commits/${pr.head.sha}/status`);
		desired.push({
			number: pr.number,
			sha: pr.head.sha,
			ready: passed(status),
			status: status.state,
		});
	}
	let fingerprint = JSON.stringify(desired);
	let file = join(state, 'pipelineDispatch.json');
	let previous;
	try {
		previous = JSON.parse(await readFile(file, 'utf8'));
	} catch (error) {
		if (error.code !== 'ENOENT') throw error;
	}
	if (previous) {
		let pipeline = await ci(`pipelines/${previous.number}`);
		// Serialize reconciliations; an event while running is retried by the timer.
		if (['pending', 'running', 'blocked'].includes(pipeline.status)) return;
		if (pipeline.status === 'success' && previous.fingerprint === fingerprint)
			return;
	}
	let pipeline = await ci('pipelines', {
		branch: 'main',
		variables: { PLUOX_PREVIEW_RECONCILE: 'true' },
		message: 'Reconcile trusted PR previews',
	});
	if (!Number.isSafeInteger(pipeline.number) || pipeline.number < 1)
		throw new Error('Invalid Woodpecker pipeline response.');
	await writeFile(
		file + '.new',
		JSON.stringify({ number: pipeline.number, fingerprint }) + '\n',
		{ mode: 0o600 },
	);
	await rename(file + '.new', file);
	console.log(
		`Preview reconciliation queued as Woodpecker pipeline #${pipeline.number}.`,
	);
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
