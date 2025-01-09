import type { TMonth, TYear } from '@root/core/domain/temporal/types';
import type { TExpenseDTO } from '@root/core/modules/expense/application/dto/expenseDTO';
import type { TExpenseGroupByDate } from '@root/core/modules/expense/application/expenseGroupingService/types';
import type { TMonthlyExpensesByCategory } from '@root/core/modules/expense/domain/expenseUseCases/monthlyExpensesByCategoryUseCase';

export interface IExpenseService {
	getTotalByYear(year?: TYear): number;
	getTotalByMonth(month: TMonth, year?: TYear): number;
	getTotalByDay(): number;

	getMonthlyExpensesByCategory(month: TMonth): TMonthlyExpensesByCategory[];

	groupExpenseByDate(expenses: TExpenseDTO[]): TExpenseGroupByDate[];
}
