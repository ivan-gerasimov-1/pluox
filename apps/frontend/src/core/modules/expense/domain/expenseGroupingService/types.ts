import type { IExpense } from '@root/core/modules/expense/domain/expenseEntity/types';
import type { TExpenseGroupByDate } from '@root/core/modules/expense/domain/types';

export interface IExpenseGroupingService {
	groupByDay(expenses: IExpense[]): TExpenseGroupByDate[];
}
