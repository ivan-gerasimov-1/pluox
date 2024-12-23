import type { IDataSource } from '@root/core/infrastructure/dataSource/types';
import type {
	ECurrency,
	TCurrencyRates,
} from '@root/core/modules/currency/domain/types';

export interface ICurrencyRateDataSource extends IDataSource<TCurrencyRates> {
	findAll(): TCurrencyRates;
	find(currency: ECurrency): number;

	save(rates: TCurrencyRates): void;

	exists(currency: ECurrency): boolean;
}
