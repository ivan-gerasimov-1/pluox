import type { TMonth, TYear } from '@pluox/core/src/domain/temporal/types';
import type { Id } from '@pluox/core/src/domain/types';

import type { TExpenseDTO } from '@pluox/core/src/modules/expense/application/dto/expenseDTO';

export interface IExpenseQueryService {
	getExpenseById(id: Id): TExpenseDTO | null;

	getDailyExpenses(): TExpenseDTO[];
	getMonthlyExpenses(month: TMonth, year?: TYear): TExpenseDTO[];
	getYearlyExpenses(year?: TYear): TExpenseDTO[];
}
