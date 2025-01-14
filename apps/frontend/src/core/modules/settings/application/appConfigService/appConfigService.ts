import type { IAppConfigService } from '@root/core/modules/settings/application/appConfigService/types';
import type {
	IAppConfig,
	TAppConfig,
} from '@root/core/modules/settings/domain/appConfig/types';
import type { IAppConfigDataSource } from '@root/core/modules/settings/infrastructure/appConfigDataSource/types';

export class AppConfigService implements IAppConfigService {
	constructor(
		private readonly appConfig: IAppConfig,
		private readonly appConfigDataSource: IAppConfigDataSource,
	) {}

	public initialize(): this {
		let config = this.appConfigDataSource.findOne();

		if (config) {
			this.updateAppConfig(config);
		} else {
			this.appConfigDataSource.insert({
				locale: this.appConfig.locale,
				budget: this.appConfig.budget,
				currency: this.appConfig.currency,
				availabelCurrencies: this.appConfig.availableCurrencies,
			});
		}

		return this;
	}

	public update(config: Partial<TAppConfig>): TAppConfig {
		this.updateAppConfig(config);

		const nextConfig = {
			locale: this.appConfig.locale,
			budget: this.appConfig.budget,
			currency: this.appConfig.currency,
			availabelCurrencies: this.appConfig.availableCurrencies,
		};

		this.appConfigDataSource.update(nextConfig);

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
