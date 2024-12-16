import type {
	ECurrency,
	TCurrencyRates,
} from '@root/core/modules/currency/domain/types';

import type { ICurrencyRatesDataSource } from '@root/core/modules/currency/infrastructure/currencyRatesDataSource/types';

export interface ICurrencyRatesService {
	get(currency: ECurrency): number;
}

export class CurrencyRatesService implements ICurrencyRatesService {
	readonly #rates: TCurrencyRates;

	constructor(currencyRatesStorage: ICurrencyRatesDataSource) {
		this.#rates = currencyRatesStorage.findAll();
	}

	public get(currency: ECurrency): number {
		return this.#rates[currency];
	}
}
