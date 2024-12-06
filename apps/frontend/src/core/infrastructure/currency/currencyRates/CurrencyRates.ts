import { getGlobalContainer } from '@root/diContainer';

import type { TCurrencyRates } from '@core/infrastructure/currency/currencyRates/types';
import type { ECurrency } from '@core/infrastructure/currency/types';

import { EServiceToken } from '@modules/serviceContainer/types';

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
			let currencyRates = getGlobalContainer()
				.get(EServiceToken.CURRENCY_RATES_STORAGE)
				.getRates();

			this.#instance = new CurrencyRates(currencyRates);
		}

		return this.#instance;
	}

	public get(currency: ECurrency): number {
		return this.#rates[currency];
	}
}
