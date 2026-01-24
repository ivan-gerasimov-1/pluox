import type { TValueOf } from '@core/types';

export const EEnvironment = {
	DEVELOPMENT: 'development',
	PRODUCTION: 'production',
} as const;

export type TEnvironment = TValueOf<typeof EEnvironment>;

export interface TMetaEnv {
	MODE: string;

	APP_API_URL: string;

	STORAGE_NAMESPACE: string;
}

export interface IEnvironment {
	readonly isDevelopment: boolean;
	readonly apiUrl: string;
	readonly storage: {
		readonly namespace: string;
		readonly cache: boolean;
	};
}
