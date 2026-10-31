import assert from 'node:assert/strict';
import { mkdtemp, readFile, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';
import {
	configuration,
	selectPulls,
	passed,
	routes,
	listPulls,
	synchronize,
	finalize,
	restore,
	checkPreview,
	github,
} from './controller.mjs';

function pull(number = 133, sha = 'a'.repeat(40)) {
	return {
		number,
		state: 'open',
		draft: false,
		user: { login: 'ivan-gerasimov-1' },
		head: { sha, repo: { full_name: 'ivan-gerasimov-1/pluox' } },
		base: { ref: 'main', repo: { full_name: 'ivan-gerasimov-1/pluox' } },
	};
}

function success() {
	return {
		state: 'success',
		statuses: [{ context: 'ci/woodpecker/push/woodpecker', state: 'success' }],
	};
}

async function fixture(t) {
	let state = await mkdtemp(join(tmpdir(), 'pluox-preview-test-'));
	t.after(() => rm(state, { recursive: true, force: true }));
	let calls = [];
	let pr = pull();
	let options = {
		state,
		domain: 'preview.example.test',
		apiOrigin: 'https://api.example.test',
		calls,
		api: async (path) =>
			path.startsWith('pulls?')
				? [pr]
				: path.startsWith('commits/')
					? success()
					: pr,
		run: async (program, args) => {
			calls.push({ program, args });
			if (program === 'git' && args.includes('rev-parse')) return pr.head.sha;
			return '';
		},
		check: async () => {},
	};
	return options;
}

async function json(state, file) {
	return JSON.parse(await readFile(join(state, file), 'utf8'));
}

function oldRelease() {
	return {
		number: 133,
		sha: 'b'.repeat(40),
		port: 20266,
		container: `pluox-preview-133-${'b'.repeat(40)}`,
		image: `pluox/preview:133-${'b'.repeat(40)}`,
	};
}

test('only owner PRs from this repository to main are selected; oldest three win', () => {
	let valid = pull();
	for (let invalid of [
		{ ...valid, user: { login: 'outsider' } },
		{
			...valid,
			head: { ...valid.head, repo: { full_name: 'outsider/pluox' } },
		},
		{ ...valid, base: { ...valid.base, ref: 'other' } },
		{ ...valid, state: 'closed' },
		{ ...valid, draft: true },
		{ ...valid, number: 20001 },
		{ ...valid, number: -1 },
		{ ...valid, head: { ...valid.head, sha: 'invalid' } },
	])
		assert.deepEqual(selectPulls([invalid]), []);
	assert.deepEqual(
		selectPulls([pull(4), pull(1), pull(3), pull(2)]).map((pr) => pr.number),
		[1, 2, 3],
	);
});

test('CI must include the successful push workflow and no failing combined status', () => {
	assert.equal(passed(success()), true);
	assert.equal(passed({ state: 'success', statuses: [] }), false);
	assert.equal(passed({ ...success(), state: 'pending' }), false);
	assert.equal(
		passed({
			state: 'success',
			statuses: [{ context: 'other', state: 'success' }],
		}),
		false,
	);
});

test('configuration rejects malformed domains and API origins', () => {
	assert.equal(
		configuration({
			PREVIEW_DOMAIN: 'preview.example.test',
			PLUOX_API_ORIGIN: 'https://api.example.test',
		}).domain,
		'preview.example.test',
	);
	for (let domain of [
		'',
		'*.example.test',
		'x.test\nrespond 200',
		'x.test:443',
		'-x.test',
	])
		assert.throws(() =>
			configuration({
				PREVIEW_DOMAIN: domain,
				PLUOX_API_ORIGIN: 'https://api.example.test',
			}),
		);
	assert.throws(() =>
		configuration({ PREVIEW_DOMAIN: 'preview.example.test' }),
	);
});

test('pagination finishes before selection and never treats a truncated list as closed PRs', async () => {
	let count = 0;
	let items = await listPulls(async () =>
		++count === 1 ? Array.from({ length: 100 }, () => pull()) : [pull(134)],
	);
	assert.equal(items.length, 101);
	await assert.rejects(
		listPulls(async () => Array(100).fill(pull())),
		/incomplete cleanup/u,
	);
	await assert.rejects(
		listPulls(async () => {
			throw new Error('rate limited');
		}),
		/rate limited/u,
	);
});

test('a successful candidate is routed only after checks and applied only after Caddy reload', async (t) => {
	let options = await fixture(t);
	await synchronize(options);
	let planned = await json(options.state, 'planned.json');
	assert.equal(planned[0].sha, pull().head.sha);
	assert.match(
		await readFile(join(options.state, 'routes.caddy'), 'utf8'),
		/pr-133.preview.example.test/u,
	);
	await assert.rejects(readFile(join(options.state, 'applied.json')), {
		code: 'ENOENT',
	});
	let run = options.calls.find(({ args }) => args[0] === 'run');
	assert.ok(run.args.includes('127.0.0.1:20266:8080'));
	assert.ok(run.args.includes('128m'));
	assert.ok(!run.args.includes('/var/run/docker.sock:/var/run/docker.sock'));
	await finalize(options);
	assert.deepEqual(await json(options.state, 'applied.json'), planned);
});

test('a failed replacement keeps the old preview and uses a separate port', async (t) => {
	let options = await fixture(t);
	let old = oldRelease();
	await writeFile(join(options.state, 'applied.json'), JSON.stringify([old]));
	options.check = async () => {
		throw new Error('Cloudflare challenge');
	};
	await assert.rejects(synchronize(options), /failed for PRs: 133/u);
	assert.deepEqual(await json(options.state, 'planned.json'), [old]);
	assert.ok(
		options.calls.some(({ args }) => args.includes('127.0.0.1:20267:8080')),
	);
});

test('pending CI preserves the old preview without starting a build', async (t) => {
	let options = await fixture(t);
	let old = oldRelease();
	await writeFile(join(options.state, 'applied.json'), JSON.stringify([old]));
	let original = options.api;
	options.api = (path) =>
		path.startsWith('commits/') ? { state: 'pending' } : original(path);
	await synchronize(options);
	assert.deepEqual(await json(options.state, 'planned.json'), [old]);
	assert.equal(options.calls.length, 0);
});

test('GitHub outage preserves routes and applied state', async (t) => {
	let options = await fixture(t);
	await writeFile(join(options.state, 'routes.caddy'), 'old routes');
	options.api = async () => {
		throw new Error('GitHub unavailable');
	};
	await assert.rejects(synchronize(options), /unavailable/u);
	assert.equal(
		await readFile(join(options.state, 'routes.caddy'), 'utf8'),
		'old routes',
	);
});

test('a PR closed during build is not published', async (t) => {
	let options = await fixture(t);
	let original = options.api;
	options.api = (path) =>
		path === 'pulls/133' ? { ...pull(), state: 'closed' } : original(path);
	await synchronize(options);
	assert.deepEqual(await json(options.state, 'planned.json'), []);
});

test('a head changed during checkout cannot be built', async (t) => {
	let options = await fixture(t);
	let original = options.run;
	options.run = (program, args) =>
		args.includes('rev-parse') ? 'c'.repeat(40) : original(program, args);
	await assert.rejects(synchronize(options), /failed for PRs: 133/u);
	assert.deepEqual(await json(options.state, 'planned.json'), []);
	assert.ok(!options.calls.some(({ args }) => args.includes('build')));
});

test('unchanged heads do not rebuild', async (t) => {
	let options = await fixture(t);
	await writeFile(
		join(options.state, 'applied.json'),
		JSON.stringify([{ ...oldRelease(), sha: pull().head.sha }]),
	);
	await synchronize(options);
	assert.equal(options.calls.length, 0);
});

test('cleanup removes only obsolete preview containers and image tags after route activation', async (t) => {
	let options = await fixture(t);
	let old = oldRelease();
	await writeFile(join(options.state, 'planned.json'), '[]');
	options.run = async (program, args) => {
		options.calls.push({ program, args });
		if (args[0] === 'ps') return `${old.container}\nproduction`;
		if (args[0] === 'image' && args[1] === 'ls')
			return `${old.image}\npluox/web:production`;
		return '';
	};
	await finalize(options);
	assert.ok(
		options.calls.some(
			({ args }) => args[0] === 'rm' && args.includes(old.container),
		),
	);
	assert.ok(
		options.calls.some(
			({ args }) => args[1] === 'rm' && args.includes(old.image),
		),
	);
	assert.ok(
		!options.calls.some(
			({ args }) =>
				args.includes('production') ||
				args.includes('pluox/web:production') ||
				args.includes('prune'),
		),
	);
});

test('failed Caddy reload can restore applied routes without removing either container', async (t) => {
	let options = await fixture(t);
	await writeFile(
		join(options.state, 'applied.json'),
		JSON.stringify([oldRelease()]),
	);
	await restore(options);
	assert.match(
		await readFile(join(options.state, 'routes.caddy'), 'utf8'),
		/127.0.0.1:20266/u,
	);
	assert.equal(options.calls.length, 0);
});

test('routes return 404 for unknown hosts and discourage indexing', () => {
	assert.match(
		routes([oldRelease()], 'preview.example.test'),
		/noindex, nofollow/u,
	);
	assert.match(routes([], 'preview.example.test'), /respond 404/u);
});

test('preview checks reject a challenge page instead of accepting HTTP 200', async () => {
	await assert.rejects(
		checkPreview({
			release: oldRelease(),
			run: async (program, args) => {
				let path = new URL(args.at(-1)).pathname;
				return path === '/healthz'
					? 'ok'
					: path === '/settings'
						? '<!doctype html>'
						: '<html>challenge</html>';
			},
		}),
	);
});

test('GitHub failures never expose tokens in the error', async () => {
	await assert.rejects(
		github(
			'pulls',
			async () => new Response('sensitive body', { status: 403 }),
		),
		/^Error: GitHub returned 403/u,
	);
});

test('ready status is published only after routing has been applied by finalize', async (t) => {
	let options = await fixture(t);
	let states = [];
	options.reporter = {
		send: async (release, state) => states.push(state),
		reconcile: async () => {},
	};
	await synchronize(options);
	assert.deepEqual(states, ['in_progress']);
	await finalize(options);
	assert.deepEqual(states, ['in_progress', 'success']);
});

test('reporting failure does not stop deployment or route activation', async (t) => {
	let options = await fixture(t);
	options.reporter = {
		send: async () => {
			throw new Error('GitHub unavailable');
		},
		reconcile: async () => {},
	};
	await synchronize(options);
	await finalize(options);
	assert.equal(
		(await json(options.state, 'applied.json'))[0].sha,
		pull().head.sha,
	);
});
