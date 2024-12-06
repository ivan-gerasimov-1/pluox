import type { TCurrencyRates } from '@core/infrastructure/currency/currencyRates/types';
import type { ICurrencyRatesAPI } from '@core/infrastructure/currency/currencyRatesAPI/types';
import { ECurrency } from '@core/infrastructure/currency/types';

export class CurrencyRatesAPI implements ICurrencyRatesAPI {
	readonly #apiEndpoint: string;
	readonly #apiKey: string;
	readonly #availableCurrencies: ECurrency[];

	constructor(
		apiEndpoint: string,
		apiKey: string,
		availableCurrencies: ECurrency[],
	) {
		this.#apiEndpoint = apiEndpoint;
		this.#apiKey = apiKey;
		this.#availableCurrencies = availableCurrencies;
	}

	public async get(): Promise<TCurrencyRates> {
		let queryParams = this.makeQueryParams();

		let response = await window.fetch(
			`${this.#apiEndpoint}/latest.json${queryParams}`,
			{
				method: 'GET',
				headers: {
					Authorization: `Token ${this.#apiKey}`,
				},
			},
		);

		let result = await response.json();

		return result.rates;
	}

	private makeQueryParams(): string {
		let query = '?';
		let queryParams = {
			symbols: this.#availableCurrencies.join(','),
			prettyprint: 0,
		};

		for (let [key, value] of Object.entries(queryParams)) {
			query = `${query}&${key}=${value}`;
		}

		return query;
	}
}
