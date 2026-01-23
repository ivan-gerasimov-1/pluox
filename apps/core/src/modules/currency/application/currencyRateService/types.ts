import type { TCurrency } from '@pluox/core/src/modules/currency/domain/types';

export interface ICurrencyRateService {
	get(currency: TCurrency): number;

	convert(amount: number, from: TCurrency, to: TCurrency): number;
}
