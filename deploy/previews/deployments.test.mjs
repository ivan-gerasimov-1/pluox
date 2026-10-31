import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';
import { deploymentReporter } from './deployments.mjs';

async function fixture(t) {
	let state = await mkdtemp(join(tmpdir(), 'pluox-deployment-status-'));
	t.after(() => rm(state, { recursive: true, force: true }));
	let calls = [];
	let options = {
		state,
		domain: 'preview.example.test',
		token: 'test-token',
		request: async (url, options) => {
			calls.push({ url, body: JSON.parse(options.body) });
			return Response.json({ id: 123 });
		},
	};
	return {
		...options,
		calls,
		reporter: deploymentReporter(options),
		release: { number: 136, sha: 'a'.repeat(40) },
	};
}

test('deployment uses the exact PR SHA and publishes a URL without merging branches', async (t) => {
	let { reporter, release, calls } = await fixture(t);
	await reporter.send(release, 'in_progress', 'Building');
	assert.equal(calls[0].body.ref, release.sha);
	assert.equal(calls[0].body.auto_merge, false);
	assert.deepEqual(calls[0].body.required_contexts, []);
	assert.equal(calls[0].body.transient_environment, true);
	assert.equal(calls[0].body.production_environment, false);
	assert.equal(calls[0].body.environment, 'preview-pr-136');
	assert.equal(calls[1].body.state, 'in_progress');
	assert.equal(
		calls[1].body.environment_url,
		'https://pr-136.preview.example.test',
	);
});

test('a repeated cycle reuses the deployment and does not spam unchanged statuses', async (t) => {
	let options = await fixture(t);
	await options.reporter.send(options.release, 'success', 'Ready');
	await deploymentReporter(options).send(options.release, 'success', 'Ready');
	assert.equal(options.calls.length, 2);
	assert.ok(
		!(
			await readFile(join(options.state, 'githubDeployments.json'), 'utf8')
		).includes('test-token'),
	);
});

test('status failure preserves the deployment ID so retry cannot create duplicates', async (t) => {
	let options = await fixture(t);
	let failed = true;
	let request = options.request;
	options.request = async (url, settings) => {
		if (url.endsWith('/statuses') && failed)
			return new Response('', { status: 503 });
		return request(url, settings);
	};
	await assert.rejects(
		deploymentReporter(options).send(options.release, 'success', 'Ready'),
		/503/u,
	);
	failed = false;
	await deploymentReporter(options).send(options.release, 'success', 'Ready');
	assert.equal(
		options.calls.filter((call) => call.url.endsWith('/deployments')).length,
		1,
	);
});

test('closed or superseded heads become inactive while desired and applied heads stay active', async (t) => {
	let { reporter, release, calls } = await fixture(t);
	await reporter.send(release, 'success', 'Ready');
	await reporter.reconcile([release]);
	assert.equal(calls.length, 2);
	await reporter.reconcile([]);
	assert.equal(calls.at(-1).body.state, 'inactive');
});

test('missing authorization disables publication without failing a preview', async (t) => {
	let options = await fixture(t);
	let reporter = deploymentReporter({ ...options, token: undefined });
	await reporter.send(options.release, 'success', 'Ready');
	await reporter.reconcile([]);
	assert.equal(options.calls.length, 0);
});
