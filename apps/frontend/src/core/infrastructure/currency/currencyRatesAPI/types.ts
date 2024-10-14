import type { TCurrencyRates } from '@core/infrastructure/currency/currencyRates/types';

export interface ICurrencyRatesAPI {
	get(): Promise<TCurrencyRates>;
}
