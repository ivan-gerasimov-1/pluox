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
	validateApiOrigin,
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
		apiOrigin: 'https://api.example.test',
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
		`PLUOX_IMAGE=pluox/web:${options.sha}\nPLUOX_API_ORIGIN=${options.apiOrigin}\n`,
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

test('main pushes require valid repository and pipeline identities', () => {
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

test('deployment events require main, production, and task deploy', () => {
	let env = {
		CI_PIPELINE_EVENT: 'deployment',
		CI_COMMIT_BRANCH: 'main',
		CI_REPO: 'ivan-gerasimov-1/pluox',
		CI_COMMIT_SHA: 'a'.repeat(40),
		CI_PIPELINE_NUMBER: '15',
		CI_PIPELINE_DEPLOY_TARGET: 'production',
		CI_PIPELINE_DEPLOY_TASK: 'deploy',
	};
	assert.deepEqual(pipelineIdentity(env), {
		sha: 'a'.repeat(40),
		number: 15,
		manualDeployment: true,
	});
	for (let [key, value] of [
		['CI_PIPELINE_DEPLOY_TARGET', 'staging'],
		['CI_PIPELINE_DEPLOY_TARGET', ''],
		['CI_PIPELINE_DEPLOY_TASK', 'migration'],
		['CI_PIPELINE_DEPLOY_TASK', ''],
		['CI_COMMIT_BRANCH', 'feature'],
	]) {
		assert.throws(() => pipelineIdentity({ ...env, [key]: value }));
	}
});

test('a deployment event can redeploy the current main commit', async (t) => {
	let options = await fixture(t);
	options.manualDeployment = true;
	let originalRun = options.run;
	options.run = async (program, args, settings) => {
		await originalRun(program, args, settings);
		if (program === 'git') return `${options.sha}\trefs/heads/main`;
	};
	await deploy(options);
	assert.equal(options.calls[0].program, 'git');
	assert.equal(
		JSON.parse(await readFile(join(options.state, 'release.json'), 'utf8')).sha,
		options.sha,
	);
});

test('a selected old main commit cannot replace a newer release', async (t) => {
	let options = await fixture(t);
	options.manualDeployment = true;
	options.run = async (program, args, settings) => {
		options.calls.push({ program, args, settings });
		return `${'b'.repeat(40)}\trefs/heads/main`;
	};
	await assert.rejects(deploy(options), /current main commit/u);
	await assertPrevious(options.state);
	assert.equal(options.calls.length, 1);
	assert.equal(options.calls[0].program, 'git');
});

test('failure to resolve main stops a deployment event before building', async (t) => {
	let options = await fixture(t);
	options.manualDeployment = true;
	options.run = async () => {
		throw new Error('Cannot reach forge');
	};
	await assert.rejects(deploy(options), /Cannot reach forge/u);
	await assertPrevious(options.state);
});

test('API configuration requires a plain HTTPS origin', () => {
	assert.equal(
		validateApiOrigin('https://api.example.test/'),
		'https://api.example.test',
	);
	for (let value of [
		undefined,
		'',
		'http://api.example.test',
		'https://user:password@api.example.test',
		'https://api.example.test/path',
		'https://api.example.test?token=value',
	]) {
		assert.throws(() => validateApiOrigin(value), /PLUOX_API_ORIGIN/u);
	}
});

test('missing API configuration fails before building or changing the release', async (t) => {
	let options = await fixture(t);
	delete options.apiOrigin;
	await assert.rejects(deploy(options), /PLUOX_API_ORIGIN/u);
	assert.equal(options.calls.length, 0);
	await assertPrevious(options.state);
});

test('rollback restores the previous API origin rather than the CI environment', async (t) => {
	let options = await fixture(t);
	let oldEnv =
		'PLUOX_IMAGE=pluox/web:previous\nPLUOX_API_ORIGIN=https://previous.example.test\n';
	await writeFile(join(options.state, '.env'), oldEnv);
	options.check = async () => {
		throw new Error('API failed');
	};
	await assert.rejects(deploy(options), /API failed/u);
	assert.equal(await readFile(join(options.state, '.env'), 'utf8'), oldEnv);
	assert.equal(
		Object.hasOwn(options.calls.at(-1).options.env, 'PLUOX_API_ORIGIN'),
		false,
	);
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
