import type { IExpense, TExpense } from '@modules/spendings/expense/types';
import type { Id } from '@modules/types';

export interface IExpenses {
	add(spending: IExpense): this;
	getAll(): TExpenses;

	list(): TExpense[];

	getTotalAmount(): number;
}

export type TExpenses = Record<Id, TExpense>;
