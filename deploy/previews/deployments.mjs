import { readFile, writeFile, rename } from 'node:fs/promises';
import { join } from 'node:path';

const REPOSITORY = 'ivan-gerasimov-1/pluox';

export function deploymentReporter({
	state,
	domain,
	token,
	pipelineUrl = '',
	request = fetch,
}) {
	let file = join(state, 'githubDeployments.json');
	async function records() {
		try {
			return JSON.parse(await readFile(file, 'utf8'));
		} catch (error) {
			if (error.code === 'ENOENT') return {};
			throw error;
		}
	}
	async function save(cache) {
		await writeFile(file + '.new', JSON.stringify(cache) + '\n', {
			mode: 0o600,
		});
		await rename(file + '.new', file);
	}
	async function api(path, body) {
		let response = await request(
			`https://api.github.com/repos/${REPOSITORY}/${path}`,
			{
				method: 'POST',
				headers: {
					Authorization: `Bearer ${token}`,
					Accept: 'application/vnd.github+json',
					'Content-Type': 'application/json',
					'User-Agent': 'pluox-previews',
				},
				body: JSON.stringify(body),
				signal: AbortSignal.timeout(30000),
			},
		);
		if (!response.ok)
			throw new Error(
				`GitHub deployment reporting returned ${response.status}.`,
			);
		return response.json();
	}
	async function send(release, status, description) {
		if (!token) return;
		let { number, sha } = release;
		if (!Number.isInteger(number) || number < 1 || !/^[a-f0-9]{40}$/u.test(sha))
			throw new Error('Invalid preview identity.');
		let cache = await records();
		let key = `${number}:${sha}`;
		let url = status === 'success' ? `https://pr-${number}.${domain}` : '';
		let record = cache[key];
		if (!record) {
			let deployment = await api('deployments', {
				ref: sha,
				task: 'preview',
				environment: `preview-pr-${number}`,
				auto_merge: false,
				required_contexts: [],
				transient_environment: true,
				production_environment: false,
				description: `Frontend preview for PR #${number}`,
			});
			if (!Number.isSafeInteger(deployment.id) || deployment.id < 1)
				throw new Error('Invalid deployment response.');
			record = { id: deployment.id, number, sha };
			cache[key] = record;
			await save(cache);
		}
		if (
			record.status === status &&
			record.url === url &&
			record.description === description &&
			record.pipelineUrl === pipelineUrl
		)
			return;
		await api(`deployments/${record.id}/statuses`, {
			state: status,
			environment_url: url,
			log_url: pipelineUrl,
			description: description.slice(0, 140),
			auto_inactive: false,
		});
		cache[key] = { ...record, status, url, description, pipelineUrl };
		await save(cache);
	}
	async function reconcile(active) {
		if (!token) return;
		for (let record of Object.values(await records())) {
			if (
				record.status !== 'inactive' &&
				!active.some(
					(release) =>
						release.number === record.number && release.sha === record.sha,
				)
			)
				await send(
					record,
					'inactive',
					'Preview closed, superseded, or no longer eligible.',
				);
		}
	}
	return { send, reconcile };
}

export async function reportSafely(action) {
	try {
		await action();
	} catch (error) {
		console.error(`Preview status could not be published: ${error.message}`);
	}
}
