import type { ILauchControl } from '@core/modules/bootstrap/application/launchControl/types';
import type { ICategoryUseCase } from '@core/modules/category/application/categoryUseCase/types';
import { ECurrency } from '@core/modules/currency/domain/types';
import type { ICurrencyRateAPI } from '@core/modules/currency/infrastructure/currencyRateAPI/types';
import type { ICurrencyRateDataSource } from '@core/modules/currency/infrastructure/currencyRateDataSource/types';
import type { ISessionService } from '@core/modules/identity/application/sessionService/types';
import type { IAppConfigService } from '@core/modules/settings/application/appConfigService/types';

export class LaunchControl implements ILauchControl {
	constructor(
		private readonly sessionService: ISessionService,
		private readonly appConfigService: IAppConfigService,
		private readonly currencyRateAPI: ICurrencyRateAPI,
		private readonly currencyRateDataSource: ICurrencyRateDataSource,
		private readonly categoryUseCase: ICategoryUseCase,
	) {}

	public async start(): Promise<void> {
		this.getAppConfig();

		await this.getCurrencyRates();

		this.sessionService.start();

		/**
		 * @description
		 * Categories must be initialized after session due to use of userId
		 */
		this.initializeCategories();
	}

	private getAppConfig(): void {
		this.appConfigService.initialize();
	}

	private async getCurrencyRates(): Promise<void> {
		let hasAllCurrencies = Object.values(ECurrency).every((currency) => {
			return this.currencyRateDataSource.exists(currency);
		});

		if (!this.currencyRateDataSource.isEmpty() && hasAllCurrencies) {
			return;
		}

		let currencyRates = await this.currencyRateAPI.get();

		this.currencyRateDataSource.upsert('data', currencyRates);
	}

	private initializeCategories(): void {
		this.categoryUseCase.initialize();
	}
}
