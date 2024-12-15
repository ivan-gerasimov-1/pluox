import type { TCurrencyRates } from '@core/infrastructure/currency/currencyRates/types';
import type { IDataSource } from '@root/core/infrastructure/dataSource/types';
import type { ECurrency } from '@core/infrastructure/currency/types';

export interface ICurrencyRatesStorage extends IDataSource<TCurrencyRates> {
	getRates(): TCurrencyRates;
	setRates(rates: TCurrencyRates): void;

	has(currency: ECurrency): boolean;
}
