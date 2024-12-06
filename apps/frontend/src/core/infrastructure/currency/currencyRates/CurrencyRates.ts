import type { TCurrencyRates } from '@core/infrastructure/currency/currencyRates/types';
import type { ECurrency } from '@core/infrastructure/currency/types';

import type { ICurrencyRatesStorage } from '@core/infrastructure/currency/currencyRatesStorage/types';

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
