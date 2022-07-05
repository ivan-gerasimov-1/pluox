import { type ECurrency } from '@domain/expense/types';

export interface ICurrencyConverter {
	convertToRub(amount: number, from: ECurrency): number;
	convert(amount: number, from: ECurrency, to: ECurrency): number;
}
