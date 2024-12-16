import type { TCurrencyRates } from '@root/core/modules/currency/currencyRates/types';
import type { ECurrency } from '@root/core/modules/currency/types';

import type { ICurrencyRatesStorage } from '@root/core/modules/currency/currencyRatesStorage/types';

export interface ICurrencyRates {
	get(currency: ECurrency): number;
}

export class CurrencyRates implements ICurrencyRates {
	#rates: TCurrencyRates;

	constructor(currencyRatesStorage: ICurrencyRatesStorage) {
		this.#rates = currencyRatesStorage.getRates();
	}

	public get(currency: ECurrency): number {
		return this.#rates[currency];
	}
}
