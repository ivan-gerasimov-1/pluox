import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import {
	atomicWrite,
	checkApplication,
	command,
	compose,
} from './autoDeploy.mjs';
import { captureRelease, selectRelease } from './releaseHistory.mjs';

export async function rollback({
	state,
	source,
	sha,
	number,
	targetSha,
	signal,
	run = command,
	check = checkApplication,
}) {
	let marker = JSON.parse(await readFile(join(state, 'release.json'), 'utf8'));
	if (marker.pipeline >= number) {
		console.log('Skipping a pipeline at or below the deployed release.');
		return;
	}
	let head = await run(
		'git',
		['-C', source, 'ls-remote', 'origin', 'refs/heads/main'],
		{ capture: true, signal },
	);
	if (head !== `${sha}\trefs/heads/main`)
		throw new Error(
			'Run rollback from a pipeline for the current main commit.',
		);
	let target = await selectRelease(state, targetSha);
	let imageId = await run(
		'docker',
		['image', 'inspect', target.imageId, '--format', '{{.Id}}'],
		{ capture: true, signal },
	);
	if (imageId !== target.imageId)
		throw new Error('The verified rollback image is not available locally.');
	let oldEnv = await readFile(join(state, '.env'), 'utf8');
	let oldCompose = await readFile(join(state, 'compose.yaml'), 'utf8');
	let current = await captureRelease({
		state,
		sha: marker.sha,
		env: oldEnv,
		compose: oldCompose,
		run,
	});
	let targetEnv = target.env.replace(
		/^PLUOX_IMAGE=.*$/mu,
		`PLUOX_IMAGE=${target.imageId}`,
	);
	let up = [
		'up',
		'-d',
		'--pull',
		'never',
		'--no-build',
		'--wait',
		'--wait-timeout',
		'120',
	];
	try {
		signal?.throwIfAborted();
		await atomicWrite(join(state, '.env'), targetEnv);
		await atomicWrite(join(state, 'compose.yaml'), target.compose);
		await compose(run, state, ['config', '--quiet'], { signal });
		await compose(run, state, up, { signal });
		await check({ state, run, signal });
		signal?.throwIfAborted();
		await atomicWrite(join(state, 'previous.env'), oldEnv);
		await atomicWrite(join(state, 'previous.compose.yaml'), oldCompose);
		await atomicWrite(
			join(state, 'previous.release.json'),
			JSON.stringify(current) + '\n',
		);
		await atomicWrite(
			join(state, 'release.json'),
			JSON.stringify({
				pipeline: number,
				sha: target.sha,
				image: target.imageId,
				action: 'rollback',
				workflowSha: sha,
			}) + '\n',
		);
	} catch (error) {
		console.error('Rollback failed; restoring the release that was running.');
		await atomicWrite(join(state, '.env'), oldEnv);
		await atomicWrite(join(state, 'compose.yaml'), oldCompose);
		await compose(run, state, up);
		throw error;
	}
	console.log(`Rolled production back to ${target.sha} (${target.imageId}).`);
}
