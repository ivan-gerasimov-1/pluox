import type { TCurrency } from '@root/core/modules/currency/domain/types';

export interface ICurrencyConverter {
	convert(amount: number, from: TCurrency, to: TCurrency): number;
}
