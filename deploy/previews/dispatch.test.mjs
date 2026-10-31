import assert from 'node:assert/strict';
import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';
import { dispatch, nextTarget, woodpecker } from './dispatch.mjs';

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
		ready: true,
		api: async (path) =>
			path.startsWith('pulls?')
				? options.pulls
				: {
						state: options.ready ? 'success' : 'pending',
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

async function applied(
	options,
	releases = [{ number: options.pr.number, sha: options.pr.head.sha }],
) {
	await writeFile(
		join(options.state, 'applied.json'),
		JSON.stringify(releases),
	);
}

test('dispatch names the PR and SHA but runs only trusted main with validated identity fields', async (t) => {
	let options = await fixture(t);
	await dispatch(options);
	assert.deepEqual(posts(options), [
		{
			path: 'pipelines',
			body: {
				branch: 'main',
				message: 'Preview PR #137 · aaaaaaaa',
				variables: {
					PLUOX_PREVIEW_RECONCILE: 'true',
					PLUOX_PREVIEW_ACTION: 'deploy',
					PLUOX_PREVIEW_PR: '137',
					PLUOX_PREVIEW_SHA: 'a'.repeat(40),
				},
			},
		},
	]);
});

test('no open PRs, pending CI, and an already applied head create no pipeline', async (t) => {
	let options = await fixture(t);
	options.pulls = [];
	await dispatch(options);
	options.pulls = [options.pr];
	options.ready = false;
	await dispatch(options);
	options.ready = true;
	await applied(options);
	await dispatch(options);
	assert.deepEqual(posts(options), []);
});

test('a legacy successful dispatch record does not create an empty migration job', async (t) => {
	let options = await fixture(t);
	await writeFile(
		join(options.state, 'pipelineDispatch.json'),
		JSON.stringify({ number: 39, fingerprint: 'legacy' }),
	);
	options.status = 'success';
	await applied(options);
	await dispatch(options);
	assert.equal(posts(options).length, 0);
});

test('running jobs coalesce events, then a changed head receives a new named job', async (t) => {
	let options = await fixture(t);
	await dispatch(options);
	await applied(options);
	options.pr.head.sha = 'b'.repeat(40);
	await dispatch(options);
	assert.equal(posts(options).length, 1);
	options.status = 'success';
	await dispatch(options);
	assert.equal(posts(options).length, 2);
	assert.equal(posts(options)[1].body.message, 'Preview PR #137 · bbbbbbbb');
	await applied(options);
	await dispatch(options);
	assert.equal(posts(options).length, 2);
});

test('closing an applied PR schedules a named removal; empty state does not loop', async (t) => {
	let options = await fixture(t);
	await applied(options);
	options.pulls = [];
	await dispatch(options);
	assert.equal(
		posts(options)[0].body.message,
		'Remove preview PR #137 · aaaaaaaa',
	);
	assert.equal(posts(options)[0].body.variables.PLUOX_PREVIEW_ACTION, 'remove');
	options.status = 'success';
	await applied(options, []);
	await dispatch(options);
	assert.equal(posts(options).length, 1);
});

test('failed activation/cleanup retries even if applied state was already persisted', async (t) => {
	let options = await fixture(t);
	await dispatch(options);
	await applied(options);
	options.status = 'failure';
	await dispatch(options);
	assert.equal(posts(options).length, 2);
	options.status = 'success';
	options.pulls = [];
	await dispatch(options);
	await applied(options, []);
	options.status = 'killed';
	await dispatch(options);
	assert.equal(posts(options).length, 4);
	assert.equal(posts(options)[3].body.variables.PLUOX_PREVIEW_ACTION, 'remove');
});

test('failed API requests are not cached and pending CI becomes deployable without an empty job', async (t) => {
	let options = await fixture(t);
	options.ready = false;
	await dispatch(options);
	assert.equal(posts(options).length, 0);
	options.ready = true;
	let ci = options.ci;
	options.ci = async () => {
		throw new Error('unavailable');
	};
	await assert.rejects(dispatch(options), /unavailable/u);
	options.ci = ci;
	await dispatch(options);
	assert.equal(posts(options).length, 1);
});

test('a failed build whose PR closed schedules cleanup even without applied state', () => {
	let retry = { action: 'deploy', number: 137, sha: 'a'.repeat(40) };
	assert.deepEqual(nextTarget({ desired: [], applied: [], retry }), {
		...retry,
		action: 'remove',
	});
});

test('multiple PRs are scheduled one at a time and obsolete previews take priority', () => {
	let desired = [1, 2].map((number) => ({
		number,
		sha: 'a'.repeat(40),
		ready: true,
	}));
	assert.equal(nextTarget({ desired, applied: [] }).number, 1);
	assert.equal(nextTarget({ desired, applied: [desired[0]] }).number, 2);
	assert.deepEqual(
		nextTarget({ desired, applied: [{ number: 3, sha: 'b'.repeat(40) }] }),
		{ action: 'remove', number: 3, sha: 'b'.repeat(40) },
	);
	assert.equal(
		nextTarget({
			desired,
			applied: desired,
			retry: { action: 'deploy', number: 1, sha: 'c'.repeat(40) },
		}),
		undefined,
	);
});

test('Woodpecker requests authenticate without exposing response bodies or tokens', async () => {
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
