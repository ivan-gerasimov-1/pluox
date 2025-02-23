import type { IDataSource } from '@root/core/infrastructure/dataSource/types';
import type {
	TCurrency,
	TCurrencyRates,
} from '@root/core/modules/currency/domain/types';

export interface ICurrencyRateDataSource extends IDataSource<TCurrencyRates> {
	findById(currency: TCurrency): number;

	exists(currency: TCurrency): boolean;
	isEmpty(): boolean;
}
