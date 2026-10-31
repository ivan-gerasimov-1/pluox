const REPOSITORY = 'ivan-gerasimov-1/pluox';

export async function setup({ token, secret, domain, request = fetch }) {
	if (
		!token ||
		!secret ||
		secret.length < 32 ||
		!/^[a-z0-9.-]+\.[a-z]+$/u.test(domain ?? '')
	)
		throw new Error(
			'Missing GitHub authorization, webhook secret, or preview domain.',
		);
	let url = `https://hooks.${domain}/github`;
	async function api(path, options = {}) {
		let response = await request(
			`https://api.github.com/repos/${REPOSITORY}/hooks${path}`,
			{
				...options,
				headers: {
					Authorization: `Bearer ${token}`,
					Accept: 'application/vnd.github+json',
					'Content-Type': 'application/json',
					'User-Agent': 'pluox-previews',
				},
				signal: AbortSignal.timeout(30000),
			},
		);
		if (!response.ok)
			throw new Error(
				`GitHub webhook setup returned ${response.status}. Check repository webhook permissions.`,
			);
		return response.json();
	}
	let found;
	for (let page = 1; page <= 10; page++) {
		let hooks = await api(`?per_page=100&page=${page}`);
		if (!Array.isArray(hooks)) throw new Error('Invalid webhook list.');
		found = hooks.find((hook) => hook.config?.url === url);
		if (found || hooks.length < 100) break;
		if (page === 10)
			throw new Error('Too many webhook pages; refusing duplicate creation.');
	}
	let body = {
		active: true,
		events: ['pull_request', 'status'],
		config: { url, content_type: 'json', secret, insecure_ssl: '0' },
	};
	if (!found) body.name = 'web';
	let result = await api(found ? `/${found.id}` : '', {
		method: found ? 'PATCH' : 'POST',
		body: JSON.stringify(body),
	});
	console.log(`GitHub webhook ${result.id} configured: ${url}`);
	return result.id;
}

// This one-shot administrative container gets a token from gh, never from PR code.
if (process.argv[1]?.endsWith('/setupWebhook.mjs')) {
	setup({
		token: process.env.PREVIEW_GITHUB_ADMIN_TOKEN,
		secret: process.env.PLUOX_WEBHOOK_SECRET,
		domain: process.env.PREVIEW_DOMAIN,
	}).catch((error) => {
		console.error(error.message);
		process.exitCode = 1;
	});
}
