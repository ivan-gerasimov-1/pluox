import { mkdir, readFile, writeFile, rename } from 'node:fs/promises';
import { join } from 'node:path';

export async function captureRelease({ state, sha, env, compose, run }) {
	let image = imageFromEnv(env);
	let imageId = await run(
		'docker',
		['image', 'inspect', image, '--format', '{{.Id}}'],
		{ capture: true },
	);
	let record = validateRelease({ sha, imageId, env, compose });
	let directory = join(state, 'releases');
	await mkdir(directory, { recursive: true });
	let file = join(directory, `${sha}.json`);
	await writeFile(file + '.new', JSON.stringify(record) + '\n', {
		mode: 0o600,
	});
	await rename(file + '.new', file);
	return record;
}

export async function selectRelease(state, targetSha) {
	if (targetSha && !/^[a-f0-9]{40}$/u.test(targetSha))
		throw new Error('Invalid rollback SHA.');
	let file = targetSha
		? join(state, 'releases', `${targetSha}.json`)
		: join(state, 'previous.release.json');
	try {
		return validateRelease(JSON.parse(await readFile(file, 'utf8')));
	} catch (error) {
		if (error.code === 'ENOENT')
			throw new Error(
				'No verified rollback release is saved. Deploy once with this workflow first.',
			);
		throw error;
	}
}

export function validateRelease(record) {
	if (
		!record ||
		!/^[a-f0-9]{40}$/u.test(record.sha ?? '') ||
		!/^sha256:[a-f0-9]{64}$/u.test(record.imageId ?? '') ||
		typeof record.compose !== 'string' ||
		!record.compose.trim()
	)
		throw new Error('Invalid saved release metadata.');
	let image = imageFromEnv(record.env);
	if (image !== `pluox/web:${record.sha}` && image !== record.imageId)
		throw new Error(
			'Saved release image does not match its commit or immutable image ID.',
		);
	return record;
}

function imageFromEnv(env) {
	if (
		typeof env !== 'string' ||
		!/^PLUOX_IMAGE=(?:pluox\/web:[a-f0-9]{40}|sha256:[a-f0-9]{64})\n(?:PLUOX_API_ORIGIN=https:\/\/\S+\n)?$/u.test(
			env,
		)
	)
		throw new Error('Invalid saved release environment.');
	return env.split('\n')[0].slice('PLUOX_IMAGE='.length);
}
