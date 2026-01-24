import { STORAGE_NAMESPACE } from '@core/modules/settings/infrastructure/environment/constants';
import {
	EEnvironment,
	type IEnvironment,
	type TMetaEnv,
} from '@core/modules/settings/infrastructure/environment/types';

export class Environment implements IEnvironment {
	readonly #isDevelopment: boolean;
	readonly #apiUrl: string;
	readonly #storage: {
		readonly namespace: string;
		readonly cache: boolean;
	};

	constructor(private readonly metaEnv: TMetaEnv) {
		this.#isDevelopment = this.detectDevEnvironment();
		this.#apiUrl = this.getApiUrl();
		this.#storage = this.getStorage();
	}

	public get isDevelopment(): boolean {
		return this.#isDevelopment;
	}

	public get apiUrl(): string {
		return this.#apiUrl;
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

	private getStorage() {
		return {
			namespace: this.metaEnv.STORAGE_NAMESPACE ?? STORAGE_NAMESPACE,
			cache: true,
		};
	}
}
