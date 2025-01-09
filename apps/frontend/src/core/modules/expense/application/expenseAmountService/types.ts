import type { TMonth, TYear } from '@root/core/domain/temporal/types';
import type { Id } from '@root/core/domain/types';

export interface IExpenseAmountService {
	getDailyAmount(): number;
	getMonthlyAmount(month?: TMonth, year?: TYear): number;
	getYearlyAmount(year?: TYear): number;

	getMonthlyAmountByCategory(month: TMonth): TMonthlyAmountByCategory[];
}

export type TMonthlyAmountByCategory = {
	id: Id;
	total: number;
	percentage: number;
};
