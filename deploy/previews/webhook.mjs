import { createHmac, timingSafeEqual, randomUUID } from 'node:crypto';
import { createServer } from 'node:http';
import { writeFile, rename } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const LIMIT = 1024 * 1024;
const REPOSITORY = 'ivan-gerasimov-1/pluox';

export function delivery({ body, signature, event, secret }) {
	if (typeof secret !== 'string' || secret.length < 32)
		throw new Error('Set a webhook secret with at least 32 characters.');
	if (!/^sha256=[a-f0-9]{64}$/u.test(signature ?? ''))
		return { status: 403, enqueue: false };
	let expected = createHmac('sha256', secret).update(body).digest();
	let actual = Buffer.from(signature.slice(7), 'hex');
	if (!timingSafeEqual(expected, actual))
		return { status: 403, enqueue: false };
	let payload;
	try {
		payload = JSON.parse(body.toString('utf8'));
	} catch {
		return { status: 400, enqueue: false };
	}
	if (!payload || typeof payload !== 'object')
		return { status: 400, enqueue: false };
	if (payload.repository?.full_name !== REPOSITORY)
		return { status: 202, enqueue: false };
	if (event === 'ping') return { status: 200, enqueue: false };
	let enqueue =
		event === 'pull_request' ||
		(event === 'status' &&
			payload.state === 'success' &&
			payload.context === 'ci/woodpecker/push/woodpecker');
	return { status: 202, enqueue };
}

export async function queue(directory) {
	// A level-triggered systemd path watches pending. Duplicate events coalesce.
	let temporary = join(directory, `pending-${randomUUID()}`);
	await writeFile(temporary, 'reconcile\n', { mode: 0o600 });
	await rename(temporary, join(directory, 'pending'));
}

export async function receive({ method, url, body, headers, secret, enqueue }) {
	if (method !== 'POST' || url !== '/github') return 404;
	if (body.length > LIMIT) return 413;
	let result = delivery({
		body,
		signature: headers['x-hub-signature-256'],
		event: headers['x-github-event'],
		secret,
	});
	if (result.enqueue) await enqueue();
	return result.status;
}

export function server({
	secret,
	directory = '/events',
	enqueue = () => queue(directory),
}) {
	// Reject missing configuration before opening the port.
	delivery({ body: Buffer.alloc(0), secret });
	let listener = createServer(async (request, response) => {
		if (request.method !== 'POST' || request.url !== '/github') {
			request.resume();
			response.writeHead(404).end();
			return;
		}
		let chunks = [];
		let size = 0;
		let oversized = false;
		request.on('data', (chunk) => {
			size += chunk.length;
			if (size > LIMIT) {
				if (!oversized) response.writeHead(413, { Connection: 'close' }).end();
				oversized = true;
				chunks = [];
				return;
			}
			if (!oversized) chunks.push(chunk);
		});
		request.on('error', () => {
			if (!response.headersSent) response.writeHead(400).end();
		});
		request.on('end', async () => {
			if (oversized) return;
			try {
				let status = await receive({
					method: request.method,
					url: request.url,
					headers: request.headers,
					body: Buffer.concat(chunks),
					secret,
					enqueue,
				});
				response.writeHead(status).end();
			} catch {
				// Never log headers, payloads, or tokens.
				console.error('Webhook queue write failed.');
				response.writeHead(503).end();
			}
		});
	});
	listener.requestTimeout = 10000;
	listener.headersTimeout = 5000;
	listener.maxConnections = 64;
	return listener;
}

if (
	process.argv[1] &&
	pathToFileURL(resolve(process.argv[1])).href === import.meta.url
) {
	server({ secret: process.env.PLUOX_WEBHOOK_SECRET }).listen(
		8091,
		'127.0.0.1',
	);
}
