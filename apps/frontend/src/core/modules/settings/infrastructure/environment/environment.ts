import { STORAGE_NAMESPACE } from '@root/core/modules/settings/infrastructure/environment/constants';
import {
	type IEnvironment,
	type TProcessEnv,
	EEnvironment,
} from '@root/core/modules/settings/infrastructure/environment/types';

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
	readonly #storage: {
		readonly namespace: string;
		readonly cache: boolean;
	};

	constructor(private readonly processEnv: TProcessEnv) {
		this.#isDevelopment = this.detectDevEnvironment(process.env.NODE_ENV);
		this.#apiUrl = this.getApiUrl(process.env.NODE_ENV);
		this.#openExchangeRates = this.getOpenExchangeRatesApi(
			process.env.NODE_ENV,
		);
		this.#storage = this.getStorage();
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

	public get storage(): {
		namespace: string;
		cache: boolean;
	} {
		return this.#storage;
	}

	private detectDevEnvironment(environment?: string | EEnvironment): boolean {
		return environment === EEnvironment.DEVELOPMENT;
	}

	private getApiUrl(env?: string | EEnvironment): string {
		return process.env.APP_API_URL as string;
	}

	private getOpenExchangeRatesApi(env?: string | EEnvironment) {
		return {
			apiUrl: process.env.APP_OPEN_EXCHANGE_RATES_API_URL as string,
			apiKey: process.env.APP_OPEN_EXCHANGE_RATES_API_KEY as string,
		};
	}

	private getStorage() {
		return {
			namespace: process.env.STORAGE_NAMESPACE ?? STORAGE_NAMESPACE,
			cache: true,
		};
	}
}
