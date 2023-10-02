import type { TMonth } from '@domain/amount/useCases/types';

export interface IAmount {
	getTotal(): number;
	getMonthly(month: TMonth): number;
}
