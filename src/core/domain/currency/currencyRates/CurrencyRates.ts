import { CURRENCY_RATE } from '@domain/currency/currencyRates/constants';
import { type TCurrencyRates } from '@domain/currency/currencyRates/types';
import { ECurrency } from '@domain/expense/types';

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
