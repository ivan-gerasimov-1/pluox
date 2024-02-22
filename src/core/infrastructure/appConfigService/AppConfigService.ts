import {
	AppConfig,
	IAppConfig,
} from '@core/infrastructure/appConfig/AppConfig';
import { TAppConfig } from '@core/infrastructure/appConfig/types';
import { AppConfigStorage } from '@core/infrastructure/appConfigStorage/AppConfigStorage';
import { IAppConfigStorage } from '@core/infrastructure/appConfigStorage/types';

export interface IAppConfigService {
	initialize(): IAppConfigService;
	saveConfig(config: Partial<TAppConfig>): IAppConfigService;
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
		let config = this.appConfigStorage.getConfig();

		if (config) {
			for (let [key, value] of Object.entries(config)) {
				if (value === undefined) {
					continue;
				}

				console.log(key, value);
				// @ts-expect-error
				this.appConfig[key] = value;
			}
		}

		return this;
	}

	public saveConfig(config: Partial<TAppConfig>): this {
		const appConfig = {
			locale: this.appConfig.locale,
			currency: this.appConfig.currency,
			availabelCurrencies: this.appConfig.availabelCurrencies,
			budget: this.appConfig.budget,
		};

		const updatedConfig: Partial<TAppConfig> = {};

		for (let [key, value] of Object.entries(config)) {
			if (value === undefined) {
				continue;
			}

			// @ts-expect-error
			this.appConfig[key] = value;

			// @ts-expect-error
			updatedConfig[key] = value;
		}

		const newConfig = {
			...appConfig,
			...updatedConfig,
		};

		this.appConfigStorage.setConfig(newConfig);

		return this;
	}
}
