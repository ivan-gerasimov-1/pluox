import {
	AppConfig,
	IAppConfig,
} from '@core/infrastructure/appConfig/AppConfig';
import { TAppConfig } from '@core/infrastructure/appConfig/types';
import { AppConfigStorage } from '@core/infrastructure/appConfigStorage/AppConfigStorage';
import { IAppConfigStorage } from '@core/infrastructure/appConfigStorage/types';

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
			let appConfig = AppConfig.getInstance();
			let appConfigStorage = AppConfigStorage.getInstance();

			this.#instance = new AppConfigService(appConfig, appConfigStorage);
		}

		return this.#instance;
	}

	public initialize(): this {
		let config = this.appConfigStorage.load();

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

		this.appConfigStorage.save(nextConfig);

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
