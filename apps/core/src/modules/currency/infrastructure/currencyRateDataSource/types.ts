import type { IDataSource } from '@core/infrastructure/dataSource/types';

import type {
	TCurrency,
	TCurrencyRates,
} from '@core/modules/currency/domain/types';

export interface ICurrencyRateDataSource extends IDataSource<TCurrencyRates> {
	findById(currency: TCurrency): number;

	exists(currency: TCurrency): boolean;
	isEmpty(): boolean;
}
