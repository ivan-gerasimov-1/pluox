import type { IDatabase } from '@root/core/infrastructure/database/types';
import { CURRENCY_RATE_STORAGE_ID } from '@root/core/modules/currency/infrastructure/currencyRateDataSource/constants';
import { CurrencyRateDataSource } from '@root/core/modules/currency/infrastructure/currencyRateDataSource/currencyRateDataSource';
import type { ICurrencyRateDataSource } from '@root/core/modules/currency/infrastructure/currencyRateDataSource/types';

export function currencyRateDataSourceFactory(
	database: IDatabase,
): ICurrencyRateDataSource {
	let collection = database.collection(CURRENCY_RATE_STORAGE_ID);

	return new CurrencyRateDataSource(collection);
}
