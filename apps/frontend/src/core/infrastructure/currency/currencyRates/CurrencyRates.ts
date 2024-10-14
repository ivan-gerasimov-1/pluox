import { TCurrencyRates } from '@core/infrastructure/currency/currencyRates/types';
import { CurrencyRatesStorage } from '@core/infrastructure/currency/currencyRatesStorage/CurrencyRatesStorage';
import { type ECurrency } from '@core/infrastructure/currency/types';

export interface ICurrencyRates {
	get(currency: ECurrency): number;
}

export class CurrencyRates implements ICurrencyRates {
	static #instance?: ICurrencyRates;

	#rates: TCurrencyRates;

	private constructor(rates: TCurrencyRates) {
		this.#rates = rates;
	}

	public static getInstance(): ICurrencyRates {
		if (!this.#instance) {
			let currencyRates = CurrencyRatesStorage.getInstance() //
				.getRates();

			this.#instance = new CurrencyRates(currencyRates);
		}

		return this.#instance;
	}

	public get(currency: ECurrency): number {
		return this.#rates[currency];
	}
}
