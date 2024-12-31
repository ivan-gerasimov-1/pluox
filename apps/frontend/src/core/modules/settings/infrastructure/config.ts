enum EEnvironment {
	DEVELOPMENT = 'development',
	PRODUCTION = 'production',
}

export interface TProcessEnv {
	NODE_ENV: string;

	APP_OPEN_EXCHANGE_RATES_API_URL: string;
	APP_OPEN_EXCHANGE_RATES_API_KEY: string;
}

export interface IEnvironment {
	readonly isDevelopment: boolean;
	readonly apiUrl: string;
	readonly openExchangeRates: {
		readonly apiUrl: string;
		readonly apiKey: string;
	};
}

/**
 * @todo
 * 1. Pass `process.env` as processEnv
 *    For some reason it doesn't work in production for now since it's not
 *    a real object
 */
export class Environment implements IEnvironment {
	readonly #isDevelopment: boolean;
	readonly #apiUrl: string;
	readonly #openExchangeRates: {
		readonly apiUrl: string;
		readonly apiKey: string;
	};

	constructor(private readonly processEnv: TProcessEnv) {
		this.#isDevelopment = this.detectDevEnvironment(process.env.NODE_ENV);
		this.#apiUrl = this.getApiUrl(process.env.NODE_ENV);
		this.#openExchangeRates = this.getOpenExchangeRatesApi(
			process.env.NODE_ENV,
		);
	}

	public get isDevelopment(): boolean {
		return this.#isDevelopment;
	}

	public get apiUrl(): string {
		return this.#apiUrl;
	}

	public get openExchangeRates(): {
		apiUrl: string;
		apiKey: string;
	} {
		return this.#openExchangeRates;
	}

	private detectDevEnvironment(environment?: string | EEnvironment): boolean {
		return environment === EEnvironment.DEVELOPMENT;
	}

	private getApiUrl(env?: string | EEnvironment): string {
		if (this.detectDevEnvironment(env)) {
			return '/api';
		}

		return window.location.hostname.includes('vercel.app')
			? 'https://savee-api.gerasimov.dev'
			: 'https://savee-api-v2.gerasimov.dev';
	}

	private getOpenExchangeRatesApi(env?: string | EEnvironment) {
		return {
			apiUrl: process.env.APP_OPEN_EXCHANGE_RATES_API_URL as string,
			apiKey: process.env.APP_OPEN_EXCHANGE_RATES_API_KEY as string,
		};
	}
}

/** @deprecated */
export type TEnvironment = {
	isDevelopment: boolean;
	apiUrl: string;
	openExchangeRates: {
		apiUrl: string;
		apiKey: string;
	};
};

export let environment: TEnvironment = {
	isDevelopment: isDevelopment(process.env.NODE_ENV),
	apiUrl: getApiUrl(process.env.NODE_ENV),
	openExchangeRates: getOpenExchangeRatesApi(process.env.NODE_ENV),
};

/** @deprecated */
function isDevelopment(environment?: string | EEnvironment) {
	return environment === EEnvironment.DEVELOPMENT;
}

/** @deprecated */
function getApiUrl(env?: string | EEnvironment): string {
	if (isDevelopment(env)) {
		return '/api';
	}

	return window.location.hostname.includes('vercel.app')
		? 'https://savee-api.gerasimov.dev'
		: 'https://savee-api-v2.gerasimov.dev';
}

/** @deprecated */
function getOpenExchangeRatesApi(env?: string | EEnvironment) {
	return {
		apiUrl: process.env.APP_OPEN_EXCHANGE_RATES_API_URL as string,
		apiKey: process.env.APP_OPEN_EXCHANGE_RATES_API_KEY as string,
	};
}
