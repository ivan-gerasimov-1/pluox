import type { ECurrency } from '@root/core/modules/currency/types';

export interface ICurrencyConverter {
	convert(amount: number, from: ECurrency, to: ECurrency): number;
}
