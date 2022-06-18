import type { IExpense, TExpense } from '@modules/expenses/expense/types';
import type { Id } from '@modules/types';

export interface IExpenses {
	add(expense: IExpense): this;
	getAll(): TExpenses;

	list(): TExpense[];

	getTotalAmount(): number;
}

export type TExpenses = Record<Id, TExpense>;
