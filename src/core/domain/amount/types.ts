import type { TMonth } from '@domain/amount/useCases/types';

export interface IAmount {
	getTotalByYear(): number;
	getTotalByMonth(month: TMonth): number;
}
