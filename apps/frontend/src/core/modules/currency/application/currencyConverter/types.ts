import type { TCurrency } from '@/core/modules/currency/domain/types';

export interface ICurrencyConverter {
	convert(amount: number, from: TCurrency, to: TCurrency): number;
}
