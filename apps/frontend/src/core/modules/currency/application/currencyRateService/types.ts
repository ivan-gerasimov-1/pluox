import type { TCurrency } from '@root/core/modules/currency/domain/types';

export interface ICurrencyRateService {
	get(currency: TCurrency): number;

	convert(amount: number, from: TCurrency, to: TCurrency): number;
}
