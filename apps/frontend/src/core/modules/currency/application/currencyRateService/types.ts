import type { TCurrency } from '@/core/modules/currency/domain/types';

export interface ICurrencyRateService {
	get(currency: TCurrency): number;

	convert(amount: number, from: TCurrency, to: TCurrency): number;
}
