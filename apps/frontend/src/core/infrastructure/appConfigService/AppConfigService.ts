import { getGlobalContainer } from '@root/diContainer';

import type { IAppConfig } from '@core/infrastructure/appConfig/AppConfig';
import type { TAppConfig } from '@core/infrastructure/appConfig/types';
import type { IAppConfigStorage } from '@core/infrastructure/appConfigStorage/types';

import { EServiceToken } from '@modules/serviceContainer/types';

export interface IAppConfigService {
	initialize(): IAppConfigService;
	update(config: Partial<TAppConfig>): TAppConfig;
}

export class AppConfigService implements IAppConfigService {
	static #instance: AppConfigService;

	private constructor(
		private readonly appConfig: IAppConfig,
		private readonly appConfigStorage: IAppConfigStorage,
	) {}

	public static getInstance(): IAppConfigService {
		if (!this.#instance) {
			let globalContainer = getGlobalContainer();

			let appConfig = globalContainer.get(EServiceToken.APP_CONFIG);
			let appConfigStorage = globalContainer.get(
				EServiceToken.APP_CONFIG_STORAGE,
			);

			this.#instance = new AppConfigService(appConfig, appConfigStorage);
		}

		return this.#instance;
	}

	public initialize(): this {
		let config = this.appConfigStorage.read();

		if (config) {
			this.updateAppConfig(config);
		}

		return this;
	}

	public update(config: Partial<TAppConfig>): TAppConfig {
		this.updateAppConfig(config);

		const nextConfig = {
			locale: this.appConfig.locale,
			budget: this.appConfig.budget,
			currency: this.appConfig.currency,
			availabelCurrencies: this.appConfig.availabelCurrencies,
		};

		this.appConfigStorage.update(nextConfig);

		return nextConfig;
	}

	private updateAppConfig(config: Partial<TAppConfig>): void {
		for (let [key, value] of Object.entries(config)) {
			if (value === undefined) {
				continue;
			}

			// @ts-expect-error | Leave as is due to nature of Object.entries
			this.appConfig[key] = value;
		}
	}
}
