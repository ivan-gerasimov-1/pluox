import type { IStorage } from '@root/core/infrastructure/database/types';
import { CURRENCY_RATE_STORAGE_ID } from '@root/core/modules/currency/infrastructure/currencyRateDataSource/constants';
import { CurrencyRateDataSource } from '@root/core/modules/currency/infrastructure/currencyRateDataSource/currencyRateDataSource';
import type { ICurrencyRateDataSource } from '@root/core/modules/currency/infrastructure/currencyRateDataSource/types';

export function currencyRateDataSourceFactory(
	storage: IStorage,
): ICurrencyRateDataSource {
	return new CurrencyRateDataSource(storage, {
		id: CURRENCY_RATE_STORAGE_ID,
	});
}
