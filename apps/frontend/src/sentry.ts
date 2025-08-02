import { init as initSentry } from '@sentry/react';

export function initializeSentry() {
	if (import.meta.env.MODE === 'development') {
		return;
	}

	initSentry({
		dsn: import.meta.env.APP_SENTRY_DSN,
		integrations: [],
	});
}
