import type { TMonth, TYear } from '@root/core/domain/temporal/types';
import type { Id } from '@root/core/domain/types';
import type { TExpenseDTO } from '@root/core/modules/expense/application/dto/expenseDTO';

export interface IExpenseAmountService {
	getDailyAmount(): number;
	getMonthlyAmount(month?: TMonth, year?: TYear): number;
	getYearlyAmount(year?: TYear): number;

	getMonthlyAmountByCategory(
		expenses: TExpenseDTO[],
	): TMonthlyAmountByCategory[];
}

export type TMonthlyAmountByCategory = {
	id: Id;
	total: number;
	percentage: number;
};
