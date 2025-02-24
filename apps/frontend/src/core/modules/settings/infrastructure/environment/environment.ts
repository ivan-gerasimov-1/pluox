import { STORAGE_NAMESPACE } from '@root/core/modules/settings/infrastructure/environment/constants';
import {
	EEnvironment,
	type IEnvironment,
	type TMetaEnv,
} from '@root/core/modules/settings/infrastructure/environment/types';

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

	constructor(private readonly metaEnv: TMetaEnv) {
		this.#isDevelopment = this.detectDevEnvironment();
		this.#apiUrl = this.getApiUrl();
		this.#openExchangeRates = this.getOpenExchangeRatesApi();
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

	private detectDevEnvironment(): boolean {
		return this.metaEnv.MODE === EEnvironment.DEVELOPMENT;
	}

	private getApiUrl(): string {
		return this.metaEnv.APP_API_URL;
	}

	private getOpenExchangeRatesApi() {
		return {
			apiUrl: this.metaEnv.APP_OPEN_EXCHANGE_RATES_API_URL,
			apiKey: this.metaEnv.APP_OPEN_EXCHANGE_RATES_API_KEY,
		};
	}

	private getStorage() {
		return {
			namespace: this.metaEnv.STORAGE_NAMESPACE ?? STORAGE_NAMESPACE,
			cache: true,
		};
	}
}
