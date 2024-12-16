import type {
	ECurrency,
	TCurrencyRates,
} from '@root/core/modules/currency/domain/types';

import type { ICurrencyRatesStorage } from '@root/core/modules/currency/infrastructure/currencyRatesStorage/types';

export interface ICurrencyRatesService {
	get(currency: ECurrency): number;
}

export class CurrencyRatesService implements ICurrencyRatesService {
	readonly #rates: TCurrencyRates;

	constructor(currencyRatesStorage: ICurrencyRatesStorage) {
		this.#rates = currencyRatesStorage.getRates();
	}

	public get(currency: ECurrency): number {
		return this.#rates[currency];
	}
}
