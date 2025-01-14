import { LocalStorageObjectDataSource } from '@root/core/infrastructure/dataSource/localStorageObjectDataSource';
import { CURRENCY_RATE_STORAGE_ID } from '@root/core/modules/currency/infrastructure/currencyRateDataSource/constants';
import { CurrencyRatesNotAvailableError } from '@root/core/modules/currency/infrastructure/currencyRateDataSource/errors';
import type {
	ECurrency,
	TCurrencyRates,
} from '@root/core/modules/currency/domain/types';
import type { ICurrencyRateDataSource } from '@root/core/modules/currency/infrastructure/currencyRateDataSource/types';

export class CurrencyRateDataSource
	extends LocalStorageObjectDataSource<TCurrencyRates>
	implements ICurrencyRateDataSource
{
	constructor() {
		super(window.localStorage, {
			id: CURRENCY_RATE_STORAGE_ID,
		});
	}

	public findById(currency: ECurrency): number {
		let rates = this.findOne();

		if (!rates) {
			throw new CurrencyRatesNotAvailableError();
		}

		return rates[currency];
	}

	public exists(currency: ECurrency): boolean {
		try {
			return !!this.findById(currency);
		} catch (error) {
			if (error instanceof CurrencyRatesNotAvailableError) {
				return false;
			}

			throw error;
		}
	}

	public isEmpty(): boolean {
		let data = this.readFromStorage();

		return data === null;
	}
}
