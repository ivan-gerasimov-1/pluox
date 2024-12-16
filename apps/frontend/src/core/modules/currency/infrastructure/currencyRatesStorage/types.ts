import type { IDataSource } from '@root/core/infrastructure/dataSource/types';
import type {
	ECurrency,
	TCurrencyRates,
} from '@root/core/modules/currency/domain/types';

export interface ICurrencyRatesStorage extends IDataSource<TCurrencyRates> {
	getRates(): TCurrencyRates;
	setRates(rates: TCurrencyRates): void;

	has(currency: ECurrency): boolean;
}
