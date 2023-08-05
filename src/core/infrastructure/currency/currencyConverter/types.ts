import { type ECurrency } from '@domain/expense/types';

export interface ICurrencyConverter {
	convert(amount: number, from: ECurrency, to: ECurrency): number;
}
