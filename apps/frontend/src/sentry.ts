import { init as initSentry } from '@sentry/react';

export function initializeSentry() {
	initSentry({
		dsn: import.meta.env.APP_SENTRY_DSN,
		integrations: [],
	});
}
