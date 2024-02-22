import type { TCurrencyRates } from '@core/infrastructure/currency/currencyRates/types';
import type { IAppStorage } from '@core/infrastructure/appStorage/types';
import type { ECurrency } from '@core/infrastructure/currency/types';

export interface ICurrencyRatesStorage extends IAppStorage<TCurrencyRates> {
	get(): TCurrencyRates | null;

	getRates(): TCurrencyRates;
	setRates(rates: TCurrencyRates): void;

	isEmpty(): boolean;
	has(currency: ECurrency): boolean;
}
