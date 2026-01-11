import { DataSource } from '@/core/infrastructure/dataSource/dataSource';

import type {
	TCurrency,
	TCurrencyRates,
} from '@/core/modules/currency/domain/types';
import { CurrencyRatesNotAvailableError } from '@/core/modules/currency/infrastructure/currencyRateDataSource/errors';
import type { ICurrencyRateDataSource } from '@/core/modules/currency/infrastructure/currencyRateDataSource/types';

export class CurrencyRateDataSource
	extends DataSource<TCurrencyRates>
	implements ICurrencyRateDataSource
{
	public findById(currency: TCurrency): number {
		let rates = this.findOne({
			id: 'data',
		});

		if (!rates) {
			throw new CurrencyRatesNotAvailableError();
		}

		return rates[currency];
	}

	public exists(currency: TCurrency): boolean {
		try {
			return Boolean(this.findById(currency));
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
