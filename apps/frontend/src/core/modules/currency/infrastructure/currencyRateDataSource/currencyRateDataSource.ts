import { ObjectDataSource } from '@root/core/infrastructure/dataSource/objectDataSource';
import { CurrencyRatesNotAvailableError } from '@root/core/modules/currency/infrastructure/currencyRateDataSource/errors';
import type {
	ECurrency,
	TCurrencyRates,
} from '@root/core/modules/currency/domain/types';
import type { ICurrencyRateDataSource } from '@root/core/modules/currency/infrastructure/currencyRateDataSource/types';

export class CurrencyRateDataSource
	extends ObjectDataSource<TCurrencyRates>
	implements ICurrencyRateDataSource
{
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
		let data = this.readData();

		return data === null;
	}
}
