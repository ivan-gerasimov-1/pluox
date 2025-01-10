import type { TMonth, TYear } from '@root/core/domain/temporal/types';
import type { TExpenseDTO } from '@root/core/modules/expense/application/dto/expenseDTO';

export interface IExpenseQueryService {
	getDailyExpenses(): TExpenseDTO[];
	getMonthlyExpenses(month: TMonth, year?: TYear): TExpenseDTO[];
	getYearlyExpenses(year?: TYear): TExpenseDTO[];
}
