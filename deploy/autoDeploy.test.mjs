import assert from 'node:assert/strict';
import { mkdtemp, mkdir, readFile, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';
import {
	deploy,
	pipelineIdentity,
	checkApplication,
	command,
} from './autoDeploy.mjs';

async function fixture(t) {
	let directory = await mkdtemp(join(tmpdir(), 'pluox-deploy-test-'));
	t.after(() => rm(directory, { recursive: true, force: true }));
	let state = join(directory, 'state');
	let source = join(directory, 'source');
	await mkdir(state);
	await mkdir(join(source, 'deploy'), { recursive: true });
	await writeFile(join(state, '.env'), 'PLUOX_IMAGE=pluox/web:previous\n');
	await writeFile(join(state, 'compose.yaml'), 'previous compose\n');
	await writeFile(join(source, 'deploy/compose.yaml'), 'new compose\n');
	let calls = [];
	return {
		state,
		source,
		sha: 'a'.repeat(40),
		number: 12,
		calls,
		run: async (program, args, options) => {
			calls.push({ program, args, options });
		},
		check: async () => {},
	};
}

async function assertPrevious(state) {
	assert.equal(
		await readFile(join(state, '.env'), 'utf8'),
		'PLUOX_IMAGE=pluox/web:previous\n',
	);
	assert.equal(
		await readFile(join(state, 'compose.yaml'), 'utf8'),
		'previous compose\n',
	);
}

test('successful deployment records the release and retains rollback files', async (t) => {
	let options = await fixture(t);
	await deploy(options);
	assert.equal(
		await readFile(join(options.state, '.env'), 'utf8'),
		`PLUOX_IMAGE=pluox/web:${options.sha}\n`,
	);
	assert.equal(
		await readFile(join(options.state, 'previous.env'), 'utf8'),
		'PLUOX_IMAGE=pluox/web:previous\n',
	);
	assert.equal(
		await readFile(join(options.state, 'previous.compose.yaml'), 'utf8'),
		'previous compose\n',
	);
	assert.equal(
		JSON.parse(await readFile(join(options.state, 'release.json'), 'utf8'))
			.pipeline,
		12,
	);
});

test('failed application checks restore the previous stack and keep its release marker', async (t) => {
	let options = await fixture(t);
	await writeFile(join(options.state, 'release.json'), '{"pipeline":10}');
	options.check = async () => {
		throw new Error('API failed');
	};
	await assert.rejects(deploy(options), /API failed/u);
	await assertPrevious(options.state);
	assert.equal(
		JSON.parse(await readFile(join(options.state, 'release.json'), 'utf8'))
			.pipeline,
		10,
	);
	assert.equal(
		options.calls.filter(({ args }) => args.includes('up')).length,
		2,
	);
});

test('failed builds leave the running application untouched', async (t) => {
	let options = await fixture(t);
	let commands = [];
	options.run = async (program, args) => {
		commands.push(args);
		throw new Error('Build failed');
	};
	await assert.rejects(deploy(options), /Build failed/u);
	assert.equal(commands.length, 1);
	assert.equal(commands[0][0], 'build');
	await assertPrevious(options.state);
});

test('older and repeated pipelines do not change the deployed release', async (t) => {
	let options = await fixture(t);
	await writeFile(join(options.state, 'release.json'), '{"pipeline":12}');
	for (let number of [11, 12]) await deploy({ ...options, number });
	assert.equal(options.calls.length, 0);
	await assertPrevious(options.state);
});

test('cancellation restores the previous stack with an un-aborted rollback command', async (t) => {
	let options = await fixture(t);
	let controller = new AbortController();
	options.signal = controller.signal;
	options.check = async () => {
		controller.abort(new Error('cancelled'));
	};
	await assert.rejects(deploy(options), /cancelled/u);
	await assertPrevious(options.state);
	let last = options.calls.at(-1);
	assert.ok(last.args.includes('up'));
	assert.equal(last.options?.signal, undefined);
	await assert.rejects(readFile(join(options.state, 'release.json')), {
		code: 'ENOENT',
	});
});

test('only main pushes with valid identities can deploy', () => {
	let env = {
		CI_PIPELINE_EVENT: 'push',
		CI_COMMIT_BRANCH: 'main',
		CI_REPO: 'ivan-gerasimov-1/pluox',
		CI_COMMIT_SHA: 'a'.repeat(40),
		CI_PIPELINE_NUMBER: '12',
	};
	assert.deepEqual(pipelineIdentity(env), { sha: 'a'.repeat(40), number: 12 });
	for (let [key, value] of [
		['CI_PIPELINE_EVENT', 'manual'],
		['CI_PIPELINE_EVENT', 'pull_request'],
		['CI_COMMIT_BRANCH', 'feature'],
		['CI_REPO', 'other/pluox'],
		['CI_COMMIT_SHA', 'invalid'],
		['CI_PIPELINE_NUMBER', '0'],
		['CI_PIPELINE_NUMBER', '1.5'],
	]) {
		assert.throws(() => pipelineIdentity({ ...env, [key]: value }));
	}
});

function applicationResponses() {
	return {
		'/healthz': 'ok',
		'/settings': '<!doctype html><html></html>',
		'/api/currencies': '{"rates":{"USD":1}}',
		'/assets/pluox-missing-asset.js': '404',
	};
}

test('application checks use the app container and validate public HTTPS', async () => {
	let responses = applicationResponses();
	let publicPaths = [];
	await checkApplication({
		state: '/unused',
		run: async (program, args) => {
			if (args[0] === 'compose') return 'app-container';
			assert.deepEqual(args.slice(0, 3), ['exec', 'app-container', 'curl']);
			return responses[new URL(args.at(-1)).pathname];
		},
		request: async (url) => {
			let path = new URL(url).pathname;
			assert.equal(new URL(url).protocol, 'https:');
			publicPaths.push(path);
			return new Response(responses[path]);
		},
	});
	assert.deepEqual(publicPaths, ['/healthz', '/api/currencies']);
});

test('an API challenge cannot pass the application checks', async () => {
	let responses = applicationResponses();
	responses['/api/currencies'] = '<html>Cloudflare challenge</html>';
	await assert.rejects(
		checkApplication({
			state: '/unused',
			run: async (program, args) =>
				args[0] === 'compose'
					? 'app-container'
					: responses[new URL(args.at(-1)).pathname],
			request: async () => {
				assert.fail(
					'Public checks must not run after a failed local API check.',
				);
			},
		}),
	);
});

test('commands capture output and report failures without invoking a shell', async () => {
	assert.equal(
		await command(process.execPath, ['-e', 'console.log("ok")'], {
			capture: true,
		}),
		'ok',
	);
	await assert.rejects(
		command(process.execPath, ['-e', 'process.exit(7)']),
		/status 7/u,
	);
});

test('aborting a running command waits for child termination', async () => {
	let controller = new AbortController();
	let running = command(
		process.execPath,
		['-e', 'setTimeout(() => {}, 10000)'],
		{ signal: controller.signal },
	);
	setTimeout(() => controller.abort(), 30);
	await assert.rejects(running, { name: 'AbortError' });
});
