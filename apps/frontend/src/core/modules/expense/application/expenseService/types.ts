import type { TMonth, TYear } from '@root/core/domain/temporal/types';
import type { TExpenseDTO } from '@root/core/modules/expense/application/dto/expenseDTO';
import type { TMonthlyAmountByCategory } from '@root/core/modules/expense/application/expenseAmountService/types';
import type { TExpenseGroupByDate } from '@root/core/modules/expense/application/expenseGroupingService/types';

export interface IExpenseService {
	getTotalByYear(year?: TYear): number;
	getTotalByMonth(month: TMonth, year?: TYear): number;
	getTotalByDay(): number;

	getMonthlyTotalByCategory(
		month: TMonth,
		year?: TYear,
	): TMonthlyAmountByCategory[];

	groupExpenseByDate(expenses: TExpenseDTO[]): TExpenseGroupByDate[];
}
