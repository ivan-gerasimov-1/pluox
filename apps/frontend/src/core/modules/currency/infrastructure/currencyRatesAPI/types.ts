import type { TCurrencyRates } from '@root/core/modules/currency/currencyRates/types';

export interface ICurrencyRatesAPI {
	get(): Promise<TCurrencyRates>;
}
