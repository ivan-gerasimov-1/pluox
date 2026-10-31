import assert from 'node:assert/strict';
import { createHmac } from 'node:crypto';
import { mkdtemp, readFile, readdir, rm, unlink } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';
import { delivery, queue, receive, server } from './webhook.mjs';
import { setup } from './setupWebhook.mjs';

const SECRET = 'test-webhook-secret-not-for-production';

function signed(payload, event = 'pull_request') {
	let body = Buffer.from(
		JSON.stringify({
			repository: { full_name: 'ivan-gerasimov-1/pluox' },
			...payload,
		}),
	);
	return {
		body,
		event,
		secret: SECRET,
		signature: `sha256=${createHmac('sha256', SECRET).update(body).digest('hex')}`,
	};
}

test('signed PR events and successful Woodpecker statuses enqueue reconciliation', () => {
	assert.deepEqual(delivery(signed({ action: 'closed' })), {
		status: 202,
		enqueue: true,
	});
	assert.deepEqual(
		delivery(
			signed(
				{ state: 'success', context: 'ci/woodpecker/push/woodpecker' },
				'status',
			),
		),
		{ status: 202, enqueue: true },
	);
});

test('missing, malformed, incorrect, and tampered signatures are rejected', () => {
	for (let signature of [
		undefined,
		'',
		'sha1=abcd',
		'sha256=xyz',
		`sha256=${'0'.repeat(64)}`,
	])
		assert.deepEqual(delivery({ ...signed({}), signature }), {
			status: 403,
			enqueue: false,
		});
	let request = signed({ action: 'opened' });
	assert.equal(delivery({ ...request, body: Buffer.from('{}') }).status, 403);
});

test('unsigned requests never cause JSON parsing or queue writes', async () => {
	let called = false;
	assert.equal(
		await receive({
			method: 'POST',
			url: '/github',
			body: Buffer.from('invalid'),
			headers: {},
			secret: SECRET,
			enqueue: async () => {
				called = true;
			},
		}),
		403,
	);
	assert.equal(called, false);
});

test('pending statuses, other checks, other repositories, and unrelated events do not enqueue', () => {
	for (let request of [
		signed(
			{ state: 'pending', context: 'ci/woodpecker/push/woodpecker' },
			'status',
		),
		signed({ state: 'success', context: 'other' }, 'status'),
		signed({ repository: { full_name: 'other/repo' } }),
		signed({}, 'push'),
	])
		assert.equal(delivery(request).enqueue, false);
	assert.deepEqual(delivery(signed({}, 'ping')), {
		status: 200,
		enqueue: false,
	});
});

test('valid signatures do not make malformed JSON acceptable', () => {
	let body = Buffer.from('invalid-json');
	let signature = `sha256=${createHmac('sha256', SECRET).update(body).digest('hex')}`;
	assert.equal(
		delivery({ body, signature, event: 'pull_request', secret: SECRET }).status,
		400,
	);
});

test('HTTP dispatch restricts methods, paths, and body size before enqueueing', async () => {
	let request = signed({});
	let calls = 0;
	let options = {
		...request,
		method: 'POST',
		url: '/github',
		headers: {
			'x-hub-signature-256': request.signature,
			'x-github-event': request.event,
		},
		enqueue: async () => {
			calls++;
		},
	};
	assert.equal(await receive({ ...options, method: 'GET' }), 404);
	assert.equal(await receive({ ...options, url: '/other' }), 404);
	assert.equal(
		await receive({ ...options, body: Buffer.alloc(1024 * 1024 + 1) }),
		413,
	);
	assert.equal(calls, 0);
	assert.equal(await receive(options), 202);
	assert.equal(calls, 1);
});

test('a request is not acknowledged if durable queueing fails', async () => {
	let request = signed({});
	await assert.rejects(
		receive({
			...request,
			method: 'POST',
			url: '/github',
			headers: {
				'x-hub-signature-256': request.signature,
				'x-github-event': request.event,
			},
			enqueue: async () => {
				throw new Error('disk full');
			},
		}),
		/disk full/u,
	);
});

test('duplicate events coalesce and an event during deployment queues another cycle', async (t) => {
	let directory = await mkdtemp(join(tmpdir(), 'pluox-webhook-test-'));
	t.after(() => rm(directory, { recursive: true, force: true }));
	await Promise.all([queue(directory), queue(directory)]);
	assert.deepEqual(await readdir(directory), ['pending']);
	assert.equal(
		await readFile(join(directory, 'pending'), 'utf8'),
		'reconcile\n',
	);
	await unlink(join(directory, 'pending'));
	await queue(directory);
	assert.deepEqual(await readdir(directory), ['pending']);
});

test('listener refuses startup without a strong configured secret', () => {
	assert.throws(() => server({ secret: '' }), /secret/u);
	assert.throws(() => server({ secret: 'short' }), /secret/u);
});

test('setup creates only the preview hook and preserves the existing CI hook', async () => {
	let requests = [];
	let id = await setup({
		token: 'test-admin-token',
		secret: SECRET,
		domain: 'preview.example.test',
		request: async (url, options) => {
			requests.push({ url, options });
			if (!options.method)
				return Response.json([
					{ id: 1, config: { url: 'https://ci.example.test/hook' } },
				]);
			return Response.json({ id: 2 });
		},
	});
	assert.equal(id, 2);
	assert.equal(requests[1].options.method, 'POST');
	let payload = JSON.parse(requests[1].options.body);
	assert.deepEqual(payload.events, ['pull_request', 'status']);
	assert.equal(payload.config.url, 'https://hooks.preview.example.test/github');
	assert.equal(payload.config.insecure_ssl, '0');
	assert.equal(payload.config.secret, SECRET);
});

test('setup updates the matching hook on a later page without duplication', async () => {
	let requests = [];
	await setup({
		token: 'test-admin-token',
		secret: SECRET,
		domain: 'preview.example.test',
		request: async (url, options) => {
			requests.push({ url, options });
			if (url.endsWith('page=1'))
				return Response.json(Array(100).fill({ id: 1, config: {} }));
			if (url.endsWith('page=2'))
				return Response.json([
					{
						id: 7,
						config: { url: 'https://hooks.preview.example.test/github' },
					},
				]);
			return Response.json({ id: 7 });
		},
	});
	assert.equal(requests[2].options.method, 'PATCH');
	assert.ok(requests[2].url.endsWith('/hooks/7'));
});

test('setup authorization failure exposes neither tokens nor response bodies', async () => {
	await assert.rejects(
		setup({
			token: 'test-admin-token',
			secret: SECRET,
			domain: 'preview.example.test',
			request: async () => new Response('private response', { status: 403 }),
		}),
		/^Error: GitHub webhook setup returned 403/u,
	);
});
