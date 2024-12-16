import type { TCurrencyRates } from '@root/core/modules/currency/application/currencyRates/types';

export interface ICurrencyRatesAPI {
	get(): Promise<TCurrencyRates>;
}
