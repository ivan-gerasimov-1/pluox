import type { ICurrencyRatesAPI } from '@root/core/modules/currency/infrastructure/currencyRatesAPI/types';
import type {
	ECurrency,
	TCurrencyRates,
} from '@root/core/modules/currency/domain/types';
import type { IAppConfig } from '@root/core/infrastructure/appConfig/AppConfig';

export class CurrencyRatesAPI implements ICurrencyRatesAPI {
	constructor(private readonly appConfig: IAppConfig) {}

	private get apiEndpoint(): string {
		return this.appConfig.openExchangeRates.apiUrl;
	}

	private get apiKey(): string {
		return this.appConfig.openExchangeRates.apiKey;
	}

	private get availableCurrencies(): ECurrency[] {
		return this.appConfig.availabelCurrencies;
	}

	public async get(): Promise<TCurrencyRates> {
		let queryParams = this.makeQueryParams();

		let response = await window.fetch(
			`${this.apiEndpoint}/latest.json${queryParams}`,
			{
				method: 'GET',
				headers: {
					Authorization: `Token ${this.apiKey}`,
				},
			},
		);

		let result = await response.json();

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
}
