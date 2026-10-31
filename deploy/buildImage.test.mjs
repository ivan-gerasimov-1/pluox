import assert from 'node:assert/strict';
import { test } from 'node:test';
import { buildImage } from './buildImage.mjs';

test('builds require the named builder and load images into the host engine', async () => {
	let calls = [];
	await buildImage({
		source: '/source',
		image: 'pluox/test:sha',
		run: async (program, args) => {
			calls.push(args);
		},
	});
	assert.deepEqual(calls[0], ['buildx', 'inspect', 'pluox-one-cpu']);
	assert.deepEqual(calls[1], [
		'buildx',
		'build',
		'--builder',
		'pluox-one-cpu',
		'--load',
		'--build-arg',
		'APP_API_URL=/api',
		'-t',
		'pluox/test:sha',
		'/source',
	]);
});

test('a missing builder is created with a shared CPU and one-core quota', async () => {
	let calls = [];
	await buildImage({
		source: '/source',
		image: 'pluox/test:sha',
		run: async (program, args) => {
			calls.push(args);
			if (args[1] === 'inspect') throw new Error('missing builder');
		},
	});
	assert.equal(calls[1][1], 'create');
	assert.ok(
		calls[1].includes(
			'cpu-period=100000,cpu-quota=100000,cpuset-cpus=0,memory=2g,memory-swap=2g',
		),
	);
	assert.equal(calls[2][1], 'build');
});

test('builder creation failure cannot fall back to unrestricted docker build', async () => {
	let calls = [];
	await assert.rejects(
		buildImage({
			source: '/source',
			image: 'image',
			run: async (program, args) => {
				calls.push(args);
				throw new Error('Docker unavailable');
			},
		}),
		/Docker unavailable/u,
	);
	assert.ok(!calls.some((args) => args[0] === 'build' || args[1] === 'build'));
});

test('cancellation does not create another builder', async () => {
	let controller = new AbortController();
	controller.abort(new Error('cancelled'));
	let calls = [];
	await assert.rejects(
		buildImage({
			source: '/source',
			image: 'image',
			signal: controller.signal,
			run: async (program, args) => {
				calls.push(args);
				throw controller.signal.reason;
			},
		}),
		/cancelled/u,
	);
	assert.equal(calls.length, 1);
});
