import assert from 'node:assert/strict';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';
import { dispatch, woodpecker } from './dispatch.mjs';

async function fixture(t) {
	let state = await mkdtemp(join(tmpdir(), 'pluox-dispatch-'));
	t.after(() => rm(state, { recursive: true, force: true }));
	let pr = {
		number: 137,
		state: 'open',
		draft: false,
		user: { login: 'ivan-gerasimov-1' },
		head: {
			sha: 'a'.repeat(40),
			repo: { full_name: 'ivan-gerasimov-1/pluox' },
		},
		base: { ref: 'main', repo: { full_name: 'ivan-gerasimov-1/pluox' } },
	};
	let calls = [];
	let options = {
		state,
		calls,
		pr,
		status: 'running',
		pulls: [pr],
		api: async (path) =>
			path.startsWith('pulls?')
				? options.pulls
				: {
						state: 'success',
						statuses: [
							{ context: 'ci/woodpecker/push/woodpecker', state: 'success' },
						],
					},
		ci: async (path, body) => {
			calls.push({ path, body });
			return body ? { number: 42 } : { status: options.status };
		},
	};
	return options;
}

function posts(options) {
	return options.calls.filter((call) => call.body);
}

test('dispatch runs trusted main with a fixed flag, never the PR branch or SHA', async (t) => {
	let options = await fixture(t);
	await dispatch(options);
	assert.deepEqual(posts(options), [
		{
			path: 'pipelines',
			body: {
				branch: 'main',
				variables: { PLUOX_PREVIEW_RECONCILE: 'true' },
				message: 'Reconcile trusted PR previews',
			},
		},
	]);
});

test('running jobs coalesce events, but a changed head is dispatched after completion', async (t) => {
	let options = await fixture(t);
	await dispatch(options);
	options.pr.head.sha = 'b'.repeat(40);
	await dispatch(options);
	assert.equal(posts(options).length, 1);
	options.status = 'success';
	await dispatch(options);
	assert.equal(posts(options).length, 2);
	await dispatch(options);
	assert.equal(posts(options).length, 2);
});

test('successful unchanged reconciliations do not loop; closing a PR schedules cleanup', async (t) => {
	let options = await fixture(t);
	await dispatch(options);
	options.status = 'success';
	await dispatch(options);
	assert.equal(posts(options).length, 1);
	options.pulls = [];
	await dispatch(options);
	assert.equal(posts(options).length, 2);
});

test('failed and cancelled pipelines are retried, without caching a failed dispatch request', async (t) => {
	let options = await fixture(t);
	let ci = options.ci;
	options.ci = async () => {
		throw new Error('unavailable');
	};
	await assert.rejects(dispatch(options), /unavailable/u);
	options.ci = ci;
	await dispatch(options);
	options.status = 'failure';
	await dispatch(options);
	options.status = 'killed';
	await dispatch(options);
	assert.equal(posts(options).length, 3);
});

test('a successful push arriving after the initial pending cycle schedules another pipeline', async (t) => {
	let options = await fixture(t);
	let api = options.api;
	options.api = async (path) =>
		path.startsWith('commits/') ? { state: 'pending' } : api(path);
	await dispatch(options);
	options.status = 'success';
	options.api = api;
	await dispatch(options);
	assert.equal(posts(options).length, 2);
});

test('Woodpecker requests use authentication and never expose response bodies or tokens', async () => {
	let calls = [];
	let ci = woodpecker({
		origin: 'https://ci.example.test',
		token: 'secret',
		repository: '1',
		request: async (url, settings) => {
			calls.push({ url, settings });
			return Response.json({ number: 42 });
		},
	});
	await ci('pipelines', { branch: 'main' });
	assert.equal(calls[0].url, 'https://ci.example.test/api/repos/1/pipelines');
	assert.equal(calls[0].settings.headers.Authorization, 'Bearer secret');
	assert.equal(calls[0].settings.method, 'POST');
	let failing = woodpecker({
		origin: 'https://ci.example.test',
		token: 'secret',
		repository: '1',
		request: async () => new Response('secret body', { status: 403 }),
	});
	await assert.rejects(
		failing('pipelines'),
		/^Error: Woodpecker returned 403\.$/u,
	);
	assert.throws(
		() =>
			woodpecker({
				origin: 'http://ci.example.test',
				token: 'secret',
				repository: '1',
			}),
		/HTTPS/u,
	);
});
