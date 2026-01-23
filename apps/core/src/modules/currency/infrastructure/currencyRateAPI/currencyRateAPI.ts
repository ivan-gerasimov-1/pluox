import type { TCurrencyRates } from '@pluox/core/src/modules/currency/domain/types';
import type { ICurrencyRateAPI } from '@pluox/core/src/modules/currency/infrastructure/currencyRateAPI/types';
import type { IEnvironment } from '@pluox/core/src/modules/settings/infrastructure/environment/types';

/**
 * @todo LV-98 | Use ApiClient as base class
 */
export class CurrencyRateAPI implements ICurrencyRateAPI {
	constructor(private readonly environment: IEnvironment) {}

	private get apiEndpoint(): string {
		return this.environment.apiUrl;
	}

	public async get(): Promise<TCurrencyRates> {
		let result = await this.fetch();

		return result.rates;
	}

	private async fetch(): Promise<{
		rates: TCurrencyRates;
	}> {
		let response = await window.fetch(`${this.apiEndpoint}/currencies`, {
			method: 'GET',
		});

		return response.json();
	}
}
