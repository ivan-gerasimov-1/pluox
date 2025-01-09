import type { TMonth, TYear } from '@root/core/domain/temporal/types';

export interface IExpenseAmountService {
	getDailyAmount(): number;
	getMonthlyAmount(month?: TMonth, year?: TYear): number;
	getYearlyAmount(year?: TYear): number;
}
