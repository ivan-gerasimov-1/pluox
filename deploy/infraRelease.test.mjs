import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import { createHash } from 'node:crypto';
import { mkdtemp, mkdir, readFile, writeFile, copyFile, rm, access } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { promisify } from 'node:util';
import { test } from 'node:test';

let execute = promisify(execFile);
let revision = 'a'.repeat(40);
let image = `sha256:${'b'.repeat(64)}`;

async function fixture(t) {
	let root = await mkdtemp(join(tmpdir(), 'pluox infra bridge '));
	t.after(() => rm(root, { recursive: true, force: true }));
	let app = join(root, 'app');
	let deploy = join(app, 'deploy');
	let releases = join(root, 'releases');
	let release = join(releases, revision);
	let bin = join(root, 'bin');
	await mkdir(deploy, { recursive: true });
	await mkdir(bin);
	let bridge = join(deploy, 'infraRelease.sh');
	await copyFile(new URL('./infraRelease.sh', import.meta.url), bridge);
	let files = {
		REVISION: revision + '\n',
		'apps/pluox/deploy/autoDeploy.mjs': 'dummy entry point; fake node records the invocation\n',
		'apps/pluox/deploy/previews/previewPipeline.sh': `#!/bin/sh
printf 'preview\\n%s\\n%s\\n%s\\n%s\\n%s\\n' "$PLUOX_PREVIEW_IMAGE" "$PLUOX_PREVIEW_ACTION" "$PLUOX_PREVIEW_PR" "$PLUOX_PREVIEW_SHA" "$PREVIEW_PIPELINE_URL" > "$CALLS"
exit "\${CHILD_EXIT:-0}"
`,
	};
	let manifest = '';
	for (let name of Object.keys(files).sort()) {
		let target = join(release, name);
		await mkdir(join(target, '..'), { recursive: true });
		await writeFile(target, files[name]);
		manifest += `${digest(files[name])}  ${name}\n`;
	}
	await writeFile(join(release, 'SHA256SUMS'), manifest);
	await writeFile(join(release, 'PREVIEW_IMAGE_ID'), image + '\n');
	await writeFile(join(deploy, 'infraRelease.lock'), `${revision} ${digest(manifest)}\n`);
	await writeFile(join(bin, 'node'), `#!/bin/sh
printf 'production\\n%s\\n%s\\n%s\\n%s\\n' "$PLUOX_SOURCE" "$CI_REPO" "$CI_PIPELINE_NUMBER" "$1" > "$CALLS"
exit "\${CHILD_EXIT:-0}"
`, { mode: 0o755 });
	await writeFile(join(bin, 'docker'), `#!/bin/sh
printf '%s\\n' "$*" >> "$DOCKER_CALLS"
printf '%s\\n' "$IMAGE_REVISION"
exit "\${INSPECT_EXIT:-0}"
`, { mode: 0o755 });
	return { root, app, deploy, release, releases, bin, bridge, calls: join(root, 'calls'), dockerCalls: join(root, 'docker-calls') };
}

function digest(text) {
	return createHash('sha256').update(text).digest('hex');
}

function runBridge(f, action = 'production', overrides = {}) {
	return execute('sh', [f.bridge, action], {
		env: {
			...process.env,
			PATH: `${f.bin}:${process.env.PATH}`,
			VPS_INFRA_RELEASES: f.releases,
			CALLS: f.calls,
			DOCKER_CALLS: f.dockerCalls,
			IMAGE_REVISION: revision,
			CI_REPO: 'ivan-gerasimov-1/pluox',
			CI_PIPELINE_NUMBER: '123',
			PLUOX_PREVIEW_ACTION: 'deploy',
			PLUOX_PREVIEW_PR: '139',
			PLUOX_PREVIEW_SHA: 'c'.repeat(40),
			PREVIEW_PIPELINE_URL: 'https://ci.example.test/pipeline/123',
			...overrides,
		},
	});
}

async function assertNotInvoked(f) {
	await assert.rejects(access(f.calls), { code: 'ENOENT' });
	await assert.rejects(access(f.dockerCalls), { code: 'ENOENT' });
}

test('production uses pinned infra and the app checkout, preserving CI identity', async (t) => {
	let f = await fixture(t);
	await runBridge(f, 'production', { PLUOX_SOURCE: '/wrong/inherited/source' });
	assert.equal(await readFile(f.calls, 'utf8'), [
		'production', f.app, 'ivan-gerasimov-1/pluox', '123',
		join(f.release, 'apps/pluox/deploy/autoDeploy.mjs'), '',
	].join('\n'));
	await assert.rejects(access(f.dockerCalls), { code: 'ENOENT' });
});

test('preview uses a verified image ID and preserves the dispatcher target', async (t) => {
	let f = await fixture(t);
	await runBridge(f, 'preview', { PLUOX_PREVIEW_IMAGE: 'untrusted:override' });
	assert.equal(await readFile(f.calls, 'utf8'), [
		'preview', image, 'deploy', '139', 'c'.repeat(40),
		'https://ci.example.test/pipeline/123', '',
	].join('\n'));
	assert.equal(await readFile(f.dockerCalls, 'utf8'),
		`image inspect --format {{index .Config.Labels "org.opencontainers.image.revision"}} ${image}\n`);
});

test('missing release fails closed without any old-code fallback', async (t) => {
	let f = await fixture(t);
	await rm(f.release, { recursive: true });
	await assert.rejects(runBridge(f), /not installed/u);
	await assertNotInvoked(f);
});

test('modified manifest is rejected before executing anything', async (t) => {
	let f = await fixture(t);
	await writeFile(join(f.release, 'SHA256SUMS'), 'changed manifest\n');
	await assert.rejects(runBridge(f));
	await assertNotInvoked(f);
});

test('modified source or revision marker is rejected before executing anything', async (t) => {
	for (let name of ['apps/pluox/deploy/autoDeploy.mjs', 'REVISION']) {
		let f = await fixture(t);
		await writeFile(join(f.release, name), 'changed data\n');
		await assert.rejects(runBridge(f));
		await assertNotInvoked(f);
	}
});

test('floating revisions, malformed digests and extra lock fields are rejected', async (t) => {
	for (let lock of ['main hash\n', `${revision} invalid\n`, `${revision} ${'d'.repeat(64)} extra\n`]) {
		let f = await fixture(t);
		await writeFile(join(f.deploy, 'infraRelease.lock'), lock);
		await assert.rejects(runBridge(f));
		await assertNotInvoked(f);
	}
});

test('mutable image tags and mismatched image revisions cannot execute a preview', async (t) => {
	let f = await fixture(t);
	await writeFile(join(f.release, 'PREVIEW_IMAGE_ID'), 'pluox/preview-controller:installed\n');
	await assert.rejects(runBridge(f, 'preview'), /image ID/u);
	await assertNotInvoked(f);
	await writeFile(join(f.release, 'PREVIEW_IMAGE_ID'), image + '\n');
	await assert.rejects(runBridge(f, 'preview', { IMAGE_REVISION: 'e'.repeat(40) }), /does not match/u);
	await assert.rejects(access(f.calls), { code: 'ENOENT' });
});

test('a missing controller image fails before the preview worker starts', async (t) => {
	let f = await fixture(t);
	await assert.rejects(runBridge(f, 'preview', { INSPECT_EXIT: '1' }));
	await assert.rejects(access(f.calls), { code: 'ENOENT' });
});

test('deployment failures propagate instead of reporting a successful bridge', async (t) => {
	let f = await fixture(t);
	for (let action of ['production', 'preview']) {
		await assert.rejects(runBridge(f, action, { CHILD_EXIT: '42' }), { code: 42 });
	}
});

test('unknown actions and relative release roots are rejected', async (t) => {
	let f = await fixture(t);
	await assert.rejects(runBridge(f, 'delete'), /Unknown/u);
	await assert.rejects(runBridge(f, 'production', { VPS_INFRA_RELEASES: 'relative' }), /absolute/u);
	await assertNotInvoked(f);
});

test('the checked-in lock pins a full revision and manifest digest', async () => {
	let lock = await readFile(new URL('./infraRelease.lock', import.meta.url), 'utf8');
	assert.match(lock, /^[a-f0-9]{40} [a-f0-9]{64}\n$/u);
});
