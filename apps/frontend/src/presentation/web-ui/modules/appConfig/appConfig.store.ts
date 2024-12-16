import { StoreApi, createStore } from 'zustand';

import type { IAppConfig } from '@core/infrastructure/appConfig/AppConfig';
import type { TAppConfig } from '@core/infrastructure/appConfig/types';
import type { IAppConfigService } from '@core/infrastructure/appConfigService/AppConfigService';

export interface IAppConfigStore {
	get(): StoreApi<TAppConfig>;
	set(config: Partial<TAppConfig>): void;
}

export class AppConfigStore implements IAppConfigStore {
	private readonly store: StoreApi<TAppConfig>;

	constructor(
		private readonly appConfig: IAppConfig,
		private readonly appConfigService: IAppConfigService,
	) {
		this.store = createStore(() => {
			return {
				locale: this.appConfig.locale,
				budget: this.appConfig.budget,
				currency: this.appConfig.currency,
				availabelCurrencies: this.appConfig.availableCurrencies,
			};
		});
	}

	public get(): StoreApi<TAppConfig> {
		return this.store;
	}

	public set(config: Partial<TAppConfig>): void {
		let nextConfig = this.appConfigService.update({
			locale: config.locale,
			budget: config.budget,
			currency: config.currency,
		});

		this.store.setState(nextConfig);
	}
}
