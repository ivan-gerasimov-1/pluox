import type { TCurrencyRates } from '@root/core/modules/currency/domain/types';

export interface ICurrencyRatesAPI {
	get(): Promise<TCurrencyRates>;
}
