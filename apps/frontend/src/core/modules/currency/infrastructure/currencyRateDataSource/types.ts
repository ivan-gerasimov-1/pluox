import type { IDataSource } from '@root/core/infrastructure/dataSource/types';
import type {
	ECurrency,
	TCurrencyRates,
} from '@root/core/modules/currency/domain/types';

export interface ICurrencyRateDataSource extends IDataSource<TCurrencyRates> {
	findById(currency: ECurrency): number;

	exists(currency: ECurrency): boolean;
	isEmpty(): boolean;
}
