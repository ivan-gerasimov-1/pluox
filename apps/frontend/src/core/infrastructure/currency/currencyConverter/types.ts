import type { ECurrency } from '@core/infrastructure/currency/types';

export interface ICurrencyConverter {
	convert(amount: number, from: ECurrency, to: ECurrency): number;
}
