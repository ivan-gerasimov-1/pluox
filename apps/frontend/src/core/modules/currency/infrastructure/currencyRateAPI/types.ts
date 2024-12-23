import type { TCurrencyRates } from '@root/core/modules/currency/domain/types';

export interface ICurrencyRateAPI {
	get(): Promise<TCurrencyRates>;
}
