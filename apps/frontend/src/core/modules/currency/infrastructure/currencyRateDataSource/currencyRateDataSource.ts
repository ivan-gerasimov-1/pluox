import { CollectionDataSource } from '@root/core/infrastructure/dataSource/collectionDataSource';
import type {
	ECurrency,
	TCurrencyRates,
} from '@root/core/modules/currency/domain/types';
import { CurrencyRatesNotAvailableError } from '@root/core/modules/currency/infrastructure/currencyRateDataSource/errors';
import type { ICurrencyRateDataSource } from '@root/core/modules/currency/infrastructure/currencyRateDataSource/types';

export class CurrencyRateDataSource
	extends CollectionDataSource<TCurrencyRates>
	implements ICurrencyRateDataSource
{
	public findById(currency: ECurrency): number {
		let rates = this.findOne({
			id: 'data',
		});

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
		let data = this.findOne({
			id: 'data',
		});

		return data === null;
	}
}
