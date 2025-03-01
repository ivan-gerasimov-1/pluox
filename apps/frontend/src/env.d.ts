/// <reference types="vite/client" />

interface ImportMetaEnv {
	/** Production */
	readonly APP_API_URL: string;

	readonly APP_OPEN_EXCHANGE_RATES_API_URL: string;
	readonly APP_OPEN_EXCHANGE_RATES_API_KEY: string;

	readonly APP_SENTRY_DSN: string;

	/** Development */
	readonly DEV_REACT_SCAN: string;
	readonly DEV_TANSTACK_QUERY_DEVTOOLS: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
