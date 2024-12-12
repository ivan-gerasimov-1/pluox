import type { Id } from '@domain/types';
import type { TExpense } from '@root/core/modules/expense/domain/expenseEntity/types';

export type {
	/**
	 * @deprecated
	 */
	IExpenseRepository as IExpenses,
} from '@root/core/modules/expense/domain/expenseRepository/types';

export type TExpenses = Record<Id, TExpense>;
