import type { ILauchControl } from '@root/core/modules/bootstrap/application/launchControl/types';
import { ECurrency } from '@root/core/modules/currency/domain/types';
import type { ICurrencyRateAPI } from '@root/core/modules/currency/infrastructure/currencyRateAPI/types';
import type { ICurrencyRateDataSource } from '@root/core/modules/currency/infrastructure/currencyRateDataSource/types';
import type { IClientIdService } from '@root/core/modules/identity/application/clientIdService/types';
import type { IUserService } from '@root/core/modules/identity/application/userService/types';
import type { IAppConfigService } from '@root/core/modules/settings/application/appConfigService/types';

export class LaunchControl implements ILauchControl {
	constructor(
		private readonly clientIdService: IClientIdService,
		private readonly userService: IUserService,
		private readonly appConfigService: IAppConfigService,
		private readonly currencyRateAPI: ICurrencyRateAPI,
		private readonly currencyRateDataSource: ICurrencyRateDataSource,
	) {}

	public async start(): Promise<void> {
		this.getAppConfig();

		await this.getCurrencyRates();

		// Check client id
		this.checkClientId();

		// Check user
		this.checkUser();
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

		this.currencyRateDataSource.save(currencyRates);
	}

	private checkClientId(): void {
		this.clientIdService.createClientId();
	}

	private checkUser(): void {
		let mainUserDTO = this.userService.getMainUser();

		if (mainUserDTO) {
			return;
		}

		this.userService.createUser({
			email: '',
			name: '',
		});
	}
}
