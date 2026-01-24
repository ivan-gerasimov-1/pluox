import type { IDatabase } from '@core/infrastructure/database/types';
import { CURRENCY_RATE_STORAGE_ID } from '@core/modules/currency/infrastructure/currencyRateDataSource/constants';
import { CurrencyRateDataSource } from '@core/modules/currency/infrastructure/currencyRateDataSource/currencyRateDataSource';
import type { ICurrencyRateDataSource } from '@core/modules/currency/infrastructure/currencyRateDataSource/types';

export function currencyRateDataSourceFactory(
	database: IDatabase,
): ICurrencyRateDataSource {
	let collection = database.collection(CURRENCY_RATE_STORAGE_ID);

	return new CurrencyRateDataSource(collection);
}
