import type { TCurrencyRates } from '@core/infrastructure/currency/currencyRates/types';
import type { ICurrencyRatesAPI } from '@core/infrastructure/currency/currencyRatesAPI/types';
import { ECurrency } from '@core/infrastructure/currency/types';

export class CurrencyRatesAPI implements ICurrencyRatesAPI {
	readonly #API_ENDPOINT: string = 'https://openexchangerates.org/api';
	readonly #API_KEY: string = 'fd33278c63404c26b51d7d37ae50731d';

	readonly #currencies: ECurrency[] = [
		ECurrency.USD,
		ECurrency.RUB,
		ECurrency.GEL,
	];

	public async get(): Promise<TCurrencyRates> {
		let queryParams = this.makeQueryParams();

		let response = await window.fetch(
			`${this.#API_ENDPOINT}/latest.json${queryParams}`,
			{
				method: 'GET',
				headers: {
					Authorization: `Token ${this.#API_KEY}`,
				},
			}
		);

		let result = await response.json();

		return result.rates;
	}

	private makeQueryParams(): string {
		let query = '?';
		let queryParams = {
			symbols: this.#currencies.join(','),
			prettyprint: 0,
		};

		for (let [key, value] of Object.entries(queryParams)) {
			query = `${query}&${key}=${value}`;
		}

		return query;
	}
}
