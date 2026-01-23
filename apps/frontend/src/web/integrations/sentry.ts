export async function initializeSentry() {
	if (import.meta.env.MODE === 'development') {
		return;
	}

	let initSentry = await loadSentry();

	initSentry({
		dsn: import.meta.env.APP_SENTRY_DSN,
		integrations: [],
	});
}

async function loadSentry() {
	return import('@sentry/react').then((module) => module.init);
}
