import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';
import {
	captureRelease,
	selectRelease,
	validateRelease,
} from './releaseHistory.mjs';

test('only captured image IDs and matching production commits are selectable', async (t) => {
	let state = await mkdtemp(join(tmpdir(), 'pluox-release-history-'));
	t.after(() => rm(state, { recursive: true, force: true }));
	let sha = 'a'.repeat(40);
	let imageId = `sha256:${'1'.repeat(64)}`;
	let record = await captureRelease({
		state,
		sha,
		env: `PLUOX_IMAGE=pluox/web:${sha}\n`,
		compose: 'tested compose',
		run: async () => imageId,
	});
	assert.deepEqual(await selectRelease(state, sha), record);
	assert.ok(
		(await readFile(join(state, 'releases', `${sha}.json`), 'utf8')).includes(
			imageId,
		),
	);
	assert.throws(
		() => validateRelease({ ...record, sha: 'b'.repeat(40) }),
		/does not match/u,
	);
	assert.throws(
		() =>
			validateRelease({
				...record,
				env: 'PLUOX_IMAGE=unreviewed/image:latest\n',
			}),
		/environment/u,
	);
	await assert.rejects(
		selectRelease(state, '../other'),
		/Invalid rollback SHA/u,
	);
	await assert.rejects(
		selectRelease(state, 'c'.repeat(40)),
		/No verified rollback release/u,
	);
});
