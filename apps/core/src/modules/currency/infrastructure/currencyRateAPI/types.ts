import type { TCurrencyRates } from '@pluox/core/src/modules/currency/domain/types';

export interface ICurrencyRateAPI {
	get(): Promise<TCurrencyRates>;
}
