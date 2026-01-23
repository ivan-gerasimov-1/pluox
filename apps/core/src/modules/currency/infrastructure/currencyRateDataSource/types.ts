import type { IDataSource } from '@pluox/core/src/infrastructure/dataSource/types';

import type {
	TCurrency,
	TCurrencyRates,
} from '@pluox/core/src/modules/currency/domain/types';

export interface ICurrencyRateDataSource extends IDataSource<TCurrencyRates> {
	findById(currency: TCurrency): number;

	exists(currency: TCurrency): boolean;
	isEmpty(): boolean;
}
