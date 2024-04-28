import {
	AppConfig,
	IAppConfig,
} from '@core/infrastructure/appConfig/AppConfig';
import { TAppConfig } from '@core/infrastructure/appConfig/types';
import {
	AppConfigService,
	IAppConfigService,
} from '@core/infrastructure/appConfigService/AppConfigService';
import { StoreApi, createStore } from 'zustand';

export interface IAppConfigStore {
	get(): StoreApi<TAppConfig>;
	set(config: Partial<TAppConfig>): void;
}

export class AppConfigStore implements IAppConfigStore {
	static #instance: AppConfigStore;

	private readonly store: StoreApi<TAppConfig>;

	private constructor(
		private readonly appConfig: IAppConfig,
		private readonly appConfigService: IAppConfigService,
	) {
		this.store = createStore(() => {
			return {
				locale: this.appConfig.locale,
				budget: this.appConfig.budget,
				currency: this.appConfig.currency,
				availabelCurrencies: this.appConfig.availabelCurrencies,
			};
		});
	}

	public static getInstance(): IAppConfigStore {
		if (!this.#instance) {
			let appConfig = AppConfig.getInstance();
			let appConfigService = AppConfigService.getInstance();

			this.#instance = new AppConfigStore(appConfig, appConfigService);
		}

		return this.#instance;
	}

	public get(): StoreApi<TAppConfig> {
		return this.store;
	}

	public set(config: Partial<TAppConfig>): void {
		if (config.locale) {
			this.appConfig.locale = config.locale;
		}

		if (config.budget !== undefined) {
			this.appConfig.budget = config.budget;
		}

		if (config.currency !== undefined) {
			this.appConfig.currency = config.currency;
		}

		this.appConfigService.saveConfig({
			locale: this.appConfig.locale,
			budget: this.appConfig.budget,
			currency: this.appConfig.currency,
		});

		this.store.setState({
			locale: this.appConfig.locale,
			budget: this.appConfig.budget,
			currency: this.appConfig.currency,
		});
	}
}
