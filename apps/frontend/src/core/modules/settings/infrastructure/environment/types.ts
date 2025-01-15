export const enum EEnvironment {
	DEVELOPMENT = 'development',
	PRODUCTION = 'production',
}

export interface TProcessEnv {
	NODE_ENV: string;

	APP_OPEN_EXCHANGE_RATES_API_URL: string;
	APP_OPEN_EXCHANGE_RATES_API_KEY: string;

	STORAGE_NAMESPACE: string;
}

export interface IEnvironment {
	readonly isDevelopment: boolean;
	readonly apiUrl: string;
	readonly openExchangeRates: {
		readonly apiUrl: string;
		readonly apiKey: string;
	};
	readonly storageNamespace: string;
}
