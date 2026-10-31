import assert from 'node:assert/strict';
import { mkdtemp, readFile, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';
import { pipelineTarget, synchronize, finalize } from './controller.mjs';

function pull(number, sha = 'a'.repeat(40)) {
	return {
		number,
		state: 'open',
		draft: false,
		user: { login: 'ivan-gerasimov-1' },
		head: { sha, repo: { full_name: 'ivan-gerasimov-1/pluox' } },
		base: { ref: 'main', repo: { full_name: 'ivan-gerasimov-1/pluox' } },
	};
}

function release(number, sha = 'b'.repeat(40)) {
	return {
		number,
		sha,
		port: 20000 + number * 2,
		container: `pluox-preview-${number}-${sha}`,
		image: `pluox/preview:${number}-${sha}`,
	};
}

async function fixture(t) {
	let state = await mkdtemp(join(tmpdir(), 'pluox-target-'));
	t.after(() => rm(state, { recursive: true, force: true }));
	let options = {
		state,
		domain: 'preview.example.test',
		apiOrigin: 'https://api.example.test',
		pulls: [pull(133), pull(134)],
		calls: [],
		target: { action: 'deploy', number: 133, sha: 'a'.repeat(40) },
		api: async (path) => {
			if (path.startsWith('pulls?')) return options.pulls;
			if (path.startsWith('pulls/'))
				return options.pulls.find(
					(pr) => String(pr.number) === path.split('/')[1],
				);
			return {
				state: 'success',
				statuses: [
					{ context: 'ci/woodpecker/push/woodpecker', state: 'success' },
				],
			};
		},
		run: async (program, args) => {
			options.calls.push({ program, args });
			if (program === 'git' && args.includes('rev-parse'))
				return 'a'.repeat(40);
			return '';
		},
		check: async () => {},
	};
	await writeFile(
		join(state, 'applied.json'),
		JSON.stringify([release(133), release(134), release(135)]),
	);
	return options;
}

async function planned(options) {
	return JSON.parse(
		await readFile(join(options.state, 'planned.json'), 'utf8'),
	);
}

test('pipeline identity rejects missing, malformed and out-of-range inputs', () => {
	let env = {
		PLUOX_PREVIEW_ACTION: 'deploy',
		PLUOX_PREVIEW_PR: '133',
		PLUOX_PREVIEW_SHA: 'a'.repeat(40),
	};
	assert.deepEqual(pipelineTarget(env), {
		action: 'deploy',
		number: 133,
		sha: 'a'.repeat(40),
	});
	for (let invalid of [
		{},
		{ ...env, PLUOX_PREVIEW_PR: '20001' },
		{ ...env, PLUOX_PREVIEW_PR: '1;id' },
		{ ...env, PLUOX_PREVIEW_SHA: 'main' },
		{ ...env, PLUOX_PREVIEW_ACTION: 'run' },
	])
		assert.throws(() => pipelineTarget(invalid), /Expected/u);
});

test('a targeted deployment builds only its PR and preserves all other applied releases', async (t) => {
	let options = await fixture(t);
	await synchronize(options);
	let next = await planned(options);
	assert.equal(next.find((r) => r.number === 133).sha, 'a'.repeat(40));
	assert.deepEqual(
		next.filter((r) => r.number !== 133),
		[release(134), release(135)],
	);
	let fetches = options.calls.filter(
		(call) => call.program === 'git' && call.args.includes('fetch'),
	);
	assert.equal(fetches.length, 1);
	assert.ok(fetches[0].args.includes('refs/pull/133/head'));
	let reported = [];
	options.reporter = {
		send: async (release) => reported.push(release.number),
		reconcile: async () => {},
	};
	await finalize(options);
	assert.deepEqual(reported, [133]);
	assert.deepEqual(
		JSON.parse(await readFile(join(options.state, 'applied.json'), 'utf8')),
		next,
	);
});

test('a removal changes only its closed PR, leaving other obsolete previews for their own jobs', async (t) => {
	let options = await fixture(t);
	options.pulls = [pull(134)];
	options.target = { action: 'remove', number: 133, sha: 'b'.repeat(40) };
	await synchronize(options);
	assert.deepEqual(await planned(options), [release(134), release(135)]);
	assert.equal(options.calls.length, 0);
});

test('stale deploys, reopened PR removals and removals for older applied SHAs are no-ops', async (t) => {
	let options = await fixture(t);
	let original = [release(133), release(134), release(135)];
	options.target.sha = 'c'.repeat(40);
	await synchronize(options);
	assert.deepEqual(await planned(options), original);
	options.target = { action: 'remove', number: 133, sha: 'b'.repeat(40) };
	await synchronize(options);
	assert.deepEqual(await planned(options), original);
	options.pulls = [pull(134)];
	options.target.sha = 'c'.repeat(40);
	await synchronize(options);
	assert.deepEqual(await planned(options), original);
	assert.equal(options.calls.length, 0);
});
