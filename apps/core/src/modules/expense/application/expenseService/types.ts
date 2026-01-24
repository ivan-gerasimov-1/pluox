import type { TMonth, TYear } from '@core/domain/temporal/types';
import type { TExpenseDTO } from '@core/modules/expense/application/dto/expenseDTO';
import type { TAmountByCategory } from '@core/modules/expense/application/expenseAmountService/types';
import type { TExpenseGroupByDate } from '@core/modules/expense/application/expenseGroupingService/types';

export interface IExpenseService {
	getTotalByYear(year?: TYear): number;
	getTotalByMonth(month: TMonth, year?: TYear): number;
	getTotalByDay(): number;

	getMonthlyTotalByCategory(month: TMonth, year?: TYear): TAmountByCategory[];

	groupExpenseByDate(expenses: TExpenseDTO[]): TExpenseGroupByDate[];
}
