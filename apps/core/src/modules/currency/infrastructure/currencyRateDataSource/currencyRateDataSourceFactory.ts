import type { IDatabase } from '@pluox/core/src/infrastructure/database/types';

import { CURRENCY_RATE_STORAGE_ID } from '@pluox/core/src/modules/currency/infrastructure/currencyRateDataSource/constants';
import { CurrencyRateDataSource } from '@pluox/core/src/modules/currency/infrastructure/currencyRateDataSource/currencyRateDataSource';
import type { ICurrencyRateDataSource } from '@pluox/core/src/modules/currency/infrastructure/currencyRateDataSource/types';

export function currencyRateDataSourceFactory(
	database: IDatabase,
): ICurrencyRateDataSource {
	let collection = database.collection(CURRENCY_RATE_STORAGE_ID);

	return new CurrencyRateDataSource(collection);
}
