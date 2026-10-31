import assert from 'node:assert/strict';
import { mkdtemp, readFile, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';
import { rollback } from './rollback.mjs';
import { captureRelease } from './releaseHistory.mjs';
import { pipelineIdentity } from './autoDeploy.mjs';

async function fixture(t) {
	let state = await mkdtemp(join(tmpdir(), 'pluox-rollback-test-'));
	t.after(() => rm(state, { recursive: true, force: true }));
	let sha = 'a'.repeat(40);
	let target = {
		sha: 'b'.repeat(40),
		imageId: `sha256:${'2'.repeat(64)}`,
		env: `PLUOX_IMAGE=pluox/web:${'b'.repeat(40)}\nPLUOX_API_ORIGIN=https://old-api.example.test\n`,
		compose: 'old tested compose\n',
	};
	let currentEnv = `PLUOX_IMAGE=pluox/web:${sha}\nPLUOX_API_ORIGIN=https://current-api.example.test\n`;
	await writeFile(join(state, '.env'), currentEnv);
	await writeFile(join(state, 'compose.yaml'), 'current compose\n');
	await writeFile(
		join(state, 'release.json'),
		JSON.stringify({ pipeline: 10, sha }),
	);
	await writeFile(join(state, 'previous.release.json'), JSON.stringify(target));
	let calls = [];
	let options = {
		state,
		source: '/source',
		sha,
		number: 12,
		calls,
		target,
		currentEnv,
		check: async () => {},
		run: async (program, args, settings) => {
			calls.push({ program, args, settings });
			if (program === 'git') return `${sha}\trefs/heads/main`;
			if (args[0] === 'image')
				return args[2].startsWith('sha256:')
					? args[2]
					: `sha256:${'1'.repeat(64)}`;
			return '';
		},
	};
	return options;
}

test('default rollback uses the previous verified image, archived configuration, and new pipeline marker', async (t) => {
	let options = await fixture(t);
	await rollback(options);
	assert.equal(
		await readFile(join(options.state, '.env'), 'utf8'),
		options.target.env.replace(
			/PLUOX_IMAGE=.*\n/u,
			`PLUOX_IMAGE=${options.target.imageId}\n`,
		),
	);
	assert.equal(
		await readFile(join(options.state, 'compose.yaml'), 'utf8'),
		options.target.compose,
	);
	let marker = JSON.parse(
		await readFile(join(options.state, 'release.json'), 'utf8'),
	);
	assert.equal(marker.pipeline, 12);
	assert.equal(marker.sha, options.target.sha);
	assert.equal(marker.action, 'rollback');
	assert.ok(
		!options.calls.some(
			({ args }) => args.includes('build') || args[0] === 'pull',
		),
	);
	let up = options.calls.find(({ args }) => args.includes('up'));
	assert.ok(up.args.includes('--no-build'));
	assert.ok(up.args.includes('never'));
	assert.equal(Object.hasOwn(up.settings.env, 'PLUOX_API_ORIGIN'), false);
	let previous = JSON.parse(
		await readFile(join(options.state, 'previous.release.json'), 'utf8'),
	);
	assert.equal(previous.sha, options.sha);
});

test('an explicit SHA selects a saved verified release', async (t) => {
	let options = await fixture(t);
	await captureRelease({
		state: options.state,
		sha: options.target.sha,
		env: options.target.env,
		compose: options.target.compose,
		run: async () => options.target.imageId,
	});
	await rollback({ ...options, targetSha: options.target.sha });
	assert.equal(
		JSON.parse(await readFile(join(options.state, 'release.json'), 'utf8')).sha,
		options.target.sha,
	);
});

test('failed rollback checks restore the running release and preserve its marker', async (t) => {
	let options = await fixture(t);
	options.check = async () => {
		throw new Error('API unavailable');
	};
	await assert.rejects(rollback(options), /API unavailable/u);
	assert.equal(
		await readFile(join(options.state, '.env'), 'utf8'),
		options.currentEnv,
	);
	assert.equal(
		await readFile(join(options.state, 'compose.yaml'), 'utf8'),
		'current compose\n',
	);
	assert.equal(
		JSON.parse(await readFile(join(options.state, 'release.json'), 'utf8'))
			.pipeline,
		10,
	);
	assert.equal(
		options.calls.filter(({ args }) => args.includes('up')).length,
		2,
	);
	assert.equal(options.calls.at(-1).settings.signal, undefined);
});

test('a missing local image stops rollback before changing the live configuration', async (t) => {
	let options = await fixture(t);
	let original = options.run;
	options.run = (program, args, settings) => {
		if (args[0] === 'image') throw new Error('No such image');
		return original(program, args, settings);
	};
	await assert.rejects(rollback(options), /No such image/u);
	assert.equal(
		await readFile(join(options.state, '.env'), 'utf8'),
		options.currentEnv,
	);
	assert.ok(!options.calls.some(({ args }) => args[0] === 'compose'));
});

test('an old workflow commit cannot execute a production rollback', async (t) => {
	let options = await fixture(t);
	options.run = async () => `${'c'.repeat(40)}\trefs/heads/main`;
	await assert.rejects(rollback(options), /current main/u);
	assert.equal(
		await readFile(join(options.state, '.env'), 'utf8'),
		options.currentEnv,
	);
});

test('duplicate or older pipeline numbers cannot undo a completed rollback', async (t) => {
	let options = await fixture(t);
	await rollback({ ...options, number: 9 });
	assert.equal(options.calls.length, 0);
});

test('cancellation restores the prior release without an aborted signal', async (t) => {
	let options = await fixture(t);
	let controller = new AbortController();
	options.check = async () => controller.abort(new Error('cancelled'));
	await assert.rejects(
		rollback({ ...options, signal: controller.signal }),
		/cancelled/u,
	);
	assert.equal(
		await readFile(join(options.state, '.env'), 'utf8'),
		options.currentEnv,
	);
	assert.equal(options.calls.at(-1).settings.signal, undefined);
});

test('only production rollback events accept an optional full SHA', () => {
	let env = {
		CI_PIPELINE_EVENT: 'deployment',
		CI_PIPELINE_DEPLOY_TARGET: 'production',
		CI_PIPELINE_DEPLOY_TASK: 'rollback',
		CI_COMMIT_BRANCH: 'main',
		CI_REPO: 'ivan-gerasimov-1/pluox',
		CI_COMMIT_SHA: 'a'.repeat(40),
		CI_PIPELINE_NUMBER: '12',
	};
	assert.equal(pipelineIdentity(env).rollback, true);
	assert.equal(
		pipelineIdentity({ ...env, PLUOX_ROLLBACK_SHA: 'b'.repeat(40) }).targetSha,
		'b'.repeat(40),
	);
	assert.throws(
		() => pipelineIdentity({ ...env, PLUOX_ROLLBACK_SHA: '../../other' }),
		/Invalid rollback SHA/u,
	);
	assert.throws(() =>
		pipelineIdentity({ ...env, CI_PIPELINE_DEPLOY_TARGET: 'preview' }),
	);
	assert.throws(() =>
		pipelineIdentity({ ...env, CI_COMMIT_BRANCH: 'feature' }),
	);
});
