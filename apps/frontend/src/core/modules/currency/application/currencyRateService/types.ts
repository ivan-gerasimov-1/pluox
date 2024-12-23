import type { ECurrency } from '@root/core/modules/currency/domain/types';

export interface ICurrencyRateService {
	get(currency: ECurrency): number;

	convert(amount: number, from: ECurrency, to: ECurrency): number;
}
