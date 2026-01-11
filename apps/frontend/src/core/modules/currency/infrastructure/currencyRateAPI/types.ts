import type { TCurrencyRates } from '@/core/modules/currency/domain/types';

export interface ICurrencyRateAPI {
	get(): Promise<TCurrencyRates>;
}
