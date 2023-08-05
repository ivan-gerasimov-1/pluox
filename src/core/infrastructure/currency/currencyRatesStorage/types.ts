import type { TCurrencyRates } from '@core/infrastructure/currency/currencyRates/types';
import type { IAppStorage } from '@core/infrastructure/appStorage/types';

export interface ICurrencyRatesStorage extends IAppStorage<TCurrencyRates> {
	get(): TCurrencyRates | null;

	getRates(): TCurrencyRates;
	setRates(rates: TCurrencyRates): void;
}
