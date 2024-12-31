import type { IEnvironment } from '@root/core/modules/settings/infrastructure/environment/types';
import type { ICurrencyRateAPI } from '@root/core/modules/currency/infrastructure/currencyRateAPI/types';
import type {
	ECurrency,
	TCurrencyRates,
} from '@root/core/modules/currency/domain/types';
import type { IAppConfig } from '@root/core/modules/settings/domain/appConfig/types';

export class CurrencyRateAPI implements ICurrencyRateAPI {
	constructor(
		private readonly environment: IEnvironment,
		private readonly appConfig: IAppConfig,
	) {}

	private get apiEndpoint(): string {
		return this.environment.openExchangeRates.apiUrl;
	}

	private get apiKey(): string {
		return this.environment.openExchangeRates.apiKey;
	}

	private get availableCurrencies(): ECurrency[] {
		return this.appConfig.availableCurrencies;
	}

	public async get(): Promise<TCurrencyRates> {
		let queryParams = this.makeQueryParams();
		let result = await this.fetch(queryParams);

		return result.rates;
	}

	private makeQueryParams(): string {
		let query = '?';
		let queryParams = {
			symbols: this.availableCurrencies.join(','),
			prettyprint: 0,
		};

		for (let [key, value] of Object.entries(queryParams)) {
			query = `${query}&${key}=${value}`;
		}

		return query;
	}

	private async fetch(queryParams: string): Promise<{
		rates: TCurrencyRates;
	}> {
		let response = await window.fetch(
			`${this.apiEndpoint}/latest.json${queryParams}`,
			{
				method: 'GET',
				headers: {
					Authorization: `Token ${this.apiKey}`,
				},
			},
		);

		return response.json();
	}
}
