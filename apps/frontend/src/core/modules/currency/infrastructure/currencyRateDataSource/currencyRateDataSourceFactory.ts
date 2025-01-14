import { CURRENCY_RATE_STORAGE_ID } from '@root/core/modules/currency/infrastructure/currencyRateDataSource/constants';
import { CurrencyRateDataSource } from '@root/core/modules/currency/infrastructure/currencyRateDataSource/currencyRateDataSource';
import type { ICurrencyRateDataSource } from '@root/core/modules/currency/infrastructure/currencyRateDataSource/types';

export function currencyRateDataSourceFactory(
	storage: Storage,
): ICurrencyRateDataSource {
	return new CurrencyRateDataSource(storage, {
		id: CURRENCY_RATE_STORAGE_ID,
	});
}
