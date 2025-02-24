import type { TValueOf } from '@root/core/types';

export const EEnvironment = {
	DEVELOPMENT: 'development',
	PRODUCTION: 'production',
} as const;

export type TEnvironment = TValueOf<typeof EEnvironment>;

export interface TMetaEnv {
	MODE: string;

	APP_API_URL: string;

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
	readonly storage: {
		readonly namespace: string;
		readonly cache: boolean;
	};
}
