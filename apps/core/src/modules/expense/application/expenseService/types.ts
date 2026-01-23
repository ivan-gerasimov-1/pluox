import type { TMonth, TYear } from '@pluox/core/src/domain/temporal/types';

import type { TExpenseDTO } from '@pluox/core/src/modules/expense/application/dto/expenseDTO';
import type { TAmountByCategory } from '@pluox/core/src/modules/expense/application/expenseAmountService/types';
import type { TExpenseGroupByDate } from '@pluox/core/src/modules/expense/application/expenseGroupingService/types';

export interface IExpenseService {
	getTotalByYear(year?: TYear): number;
	getTotalByMonth(month: TMonth, year?: TYear): number;
	getTotalByDay(): number;

	getMonthlyTotalByCategory(month: TMonth, year?: TYear): TAmountByCategory[];

	groupExpenseByDate(expenses: TExpenseDTO[]): TExpenseGroupByDate[];
}
