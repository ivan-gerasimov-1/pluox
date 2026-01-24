import type { IRepository } from '@core/domain/repository/types';
import type { TISODateString } from '@core/domain/temporal/types';

import type { IExpense } from '@core/modules/expense/domain/expenseEntity/types';

export interface IExpenseRepository extends IRepository<
	IExpense,
	TExpenseFindOptions
> {}

/**
 * @todo
 * 1. Extend filter with category, minAmount, maxAmount, etc
 * 2. Extend pagination with offset
 * 3. Add sort
 *   export type ExpenseSortField = 'date';
 *   export type SortOrder = 'asc' | 'desc';
 *   @example
 *    sort?: {
 *      field: ExpenseSortField;
 *      order: SortOrder;
 *	  };
 */
export type TExpenseFindOptions = {
	filter?: {
		dateFrom?: TISODateString;
		dateTo?: TISODateString;
	};
};
