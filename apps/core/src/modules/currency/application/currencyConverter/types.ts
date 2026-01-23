import type { TCurrency } from '@pluox/core/src/modules/currency/domain/types';

export interface ICurrencyConverter {
	convert(amount: number, from: TCurrency, to: TCurrency): number;
}
