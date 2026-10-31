import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import { mkdtemp, writeFile, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { promisify } from 'node:util';
import { test } from 'node:test';

let execute = promisify(execFile);

async function runWorker(t, failure = '') {
	let directory = await mkdtemp(join(tmpdir(), 'pluox-preview-worker-'));
	t.after(() => rm(directory, { recursive: true, force: true }));
	let log = join(directory, 'calls');
	await writeFile(
		join(directory, 'docker'),
		`#!/bin/sh
case "$*" in
  *'controller:installed sync') action=sync ;;
  *'controller:installed restore') action=restore ;;
  *'controller:installed finalize') action=finalize ;;
  *'reload --config'*) action=reload ;;
  *) exit 99 ;;
esac
printf '%s\\n' "$action" >> "$CALLS"
if [ "$action" = "$FAILURE" ] && [ ! -f "$CALLS.failed" ]; then
    touch "$CALLS.failed"
    exit 1
fi
`,
		{ mode: 0o755 },
	);
	let code = 0;
	try {
		await execute(
			'sh',
			[new URL('./previewPipeline.sh', import.meta.url).pathname],
			{
				env: {
					...process.env,
					PATH: `${directory}:${process.env.PATH}`,
					CALLS: log,
					FAILURE: failure,
				},
			},
		);
	} catch (error) {
		code = error.code;
	}
	return { code, calls: (await readFile(log, 'utf8')).trim().split('\n') };
}

test('pipeline returns success only after synchronous build, route reload and finalize', async (t) => {
	assert.deepEqual(await runWorker(t), {
		code: 0,
		calls: ['sync', 'reload', 'finalize'],
	});
});

test('build/check failure restores routes and makes CI fail without publishing ready', async (t) => {
	assert.deepEqual(await runWorker(t, 'sync'), {
		code: 1,
		calls: ['sync', 'restore'],
	});
});

test('reload failure restores and reloads previous routes and makes CI fail', async (t) => {
	assert.deepEqual(await runWorker(t, 'reload'), {
		code: 1,
		calls: ['sync', 'reload', 'restore', 'reload'],
	});
});

test('cleanup failure propagates to CI', async (t) => {
	assert.deepEqual(await runWorker(t, 'finalize'), {
		code: 1,
		calls: ['sync', 'reload', 'finalize'],
	});
});
