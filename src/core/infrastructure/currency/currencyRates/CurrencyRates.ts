import { CURRENCY_RATE } from '@core/infrastructure/currency/currencyRates/constants';
import { type ECurrency } from '@core/infrastructure/currency/types';

export interface ICurrencyRates {
	get(currency: ECurrency): number;
}

export class CurrencyRates implements ICurrencyRates {
	static #instance?: ICurrencyRates;

	#API_ENDPOINT: string = 'http://api.exchangeratesapi.io/v1';
	#API_KEY: string = '0443207916308f17e1779ecacadcacf9';

	private constructor() {}

	public static create(): ICurrencyRates {
		if (!this.#instance) {
			this.#instance = new CurrencyRates();
		}

		return this.#instance;
	}

	public get(currency: ECurrency): number {
		return CURRENCY_RATE[currency];
	}
}
