import { getGlobalContainer } from '@root/diContainer';

import type { TCurrencyRates } from '@core/infrastructure/currency/currencyRates/types';
import type { ICurrencyRatesAPI } from '@core/infrastructure/currency/currencyRatesAPI/types';
import { ECurrency } from '@core/infrastructure/currency/types';

import { EServiceToken } from '@modules/serviceContainer/types';

export class CurrencyRatesAPI implements ICurrencyRatesAPI {
	static #instance: ICurrencyRatesAPI;

	readonly #apiEndpoint: string;
	readonly #apiKey: string;
	readonly #availableCurrencies: ECurrency[];

	private constructor(
		apiEndpoint: string,
		apiKey: string,
		availableCurrencies: ECurrency[],
	) {
		this.#apiEndpoint = apiEndpoint;
		this.#apiKey = apiKey;
		this.#availableCurrencies = availableCurrencies;
	}

	public static getInstance(): ICurrencyRatesAPI {
		if (!this.#instance) {
			let appConfig = getGlobalContainer().get(EServiceToken.APP_CONFIG);

			this.#instance = new CurrencyRatesAPI(
				appConfig.openExchangeRates.apiUrl,
				appConfig.openExchangeRates.apiKey,
				appConfig.availabelCurrencies,
			);
		}

		return this.#instance;
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
