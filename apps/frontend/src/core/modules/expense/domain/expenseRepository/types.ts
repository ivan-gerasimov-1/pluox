import type { IRepository } from '@root/core/domain/repository/types';
import type { TISODateString } from '@root/core/infrastructure/temporal/types';
import type { IExpense } from '@root/core/modules/expense/domain/expenseEntity/types';

export interface IExpenseRepository
	extends IRepository<IExpense, IExpenseFindOptions> {}

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
export interface IExpenseFindOptions {
	filter?: {
		dateFrom?: TISODateString;
		dateTo?: TISODateString;
	};
}
