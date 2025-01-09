import type { IExpense } from '@root/core/modules/expense/domain/expenseEntity/types';

export type TExpenseGroupByDate = {
	date: string;
	items: IExpense[];
};
