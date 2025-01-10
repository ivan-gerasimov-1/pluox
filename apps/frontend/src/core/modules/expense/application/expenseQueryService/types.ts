import type { TMonth, TYear } from '@root/core/domain/temporal/types';
import type { Id } from '@root/core/domain/types';
import type { TExpenseDTO } from '@root/core/modules/expense/application/dto/expenseDTO';

export interface IExpenseQueryService {
	getExpenseById(id: Id): TExpenseDTO | null;

	getDailyExpenses(): TExpenseDTO[];
	getMonthlyExpenses(month: TMonth, year?: TYear): TExpenseDTO[];
	getYearlyExpenses(year?: TYear): TExpenseDTO[];
}
