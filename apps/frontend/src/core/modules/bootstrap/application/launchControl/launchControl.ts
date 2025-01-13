import type { ILauchControl } from '@root/core/modules/bootstrap/application/launchControl/types';
import { ECurrency } from '@root/core/modules/currency/domain/types';
import type { ICurrencyRateAPI } from '@root/core/modules/currency/infrastructure/currencyRateAPI/types';
import type { ICurrencyRateDataSource } from '@root/core/modules/currency/infrastructure/currencyRateDataSource/types';
import type { ISessionService } from '@root/core/modules/identity/application/sessionService/types';
import type { IAppConfigService } from '@root/core/modules/settings/application/appConfigService/types';

export class LaunchControl implements ILauchControl {
	constructor(
		private readonly sessionService: ISessionService,
		private readonly appConfigService: IAppConfigService,
		private readonly currencyRateAPI: ICurrencyRateAPI,
		private readonly currencyRateDataSource: ICurrencyRateDataSource,
	) {}

	public async start(): Promise<void> {
		this.getAppConfig();

		await this.getCurrencyRates();

		this.sessionService.start();
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

		this.currencyRateDataSource.upsert(currencyRates);
	}
}
