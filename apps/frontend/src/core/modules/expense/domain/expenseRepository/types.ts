import type { Id } from '@root/core/domain/types';
import type { TISODateString } from '@root/core/infrastructure/temporal/types';
import type { TExpenseDTO } from '@root/core/modules/expense/application/dto/expenseDTO';
import type { IExpense } from '@root/core/modules/expense/domain/expenseEntity/types';

export interface IExpenseRepository {
	create(expense: IExpense): TExpenseDTO;
	update(expense: IExpense): TExpenseDTO;

	findMany(options?: IExpenseFindManyOptions): IExpenseFindManyResult;
	/** @todo Not Implemented */
	findOne(query: unknown): TExpenseDTO;
	/**
	 * @throws {ExpenseNotFoundError}
	 */
	findById(id: Id): TExpenseDTO;

	/**
	 * @throws {ExpenseNotFoundError}
	 */
	remove(id: Id): void;
}

export type ExpenseSortField = 'date';
export type SortOrder = 'asc' | 'desc';

/**
 * @todo
 * 1. Extend filter with category, minAmount, maxAmount, etc
 * 2. Extend pagination with offset
 * 3. Add sort
 *   @example
 *    sort?: {
 *      field: ExpenseSortField;
 *      order: SortOrder;
 *	  };
 */
export interface IExpenseFindManyOptions {
	filter?: {
		dateFrom?: TISODateString;
		dateTo?: TISODateString;
	};
	pagination?: {
		limit?: number;
	};
}

/**
 * @todo
 * 1. Add pagination to result
 *   @example
 *   pagination: {
 *    offset: number;
 *    limit: number;
 *    hasMore: boolean;
 *   };
 */
export interface IExpenseFindManyResult {
	items: TExpenseDTO[];
	total: number;
}
