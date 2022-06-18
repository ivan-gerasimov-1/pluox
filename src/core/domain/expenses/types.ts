import type { IExpense, TExpense } from '@domain/expense/types';
import type { Id } from '@domain/types';

export interface IExpenses {
	add(expense: IExpense): this;
	getAll(): TExpenses;

	list(): TExpense[];

	getTotalAmount(): number;
}

export type TExpenses = Record<Id, TExpense>;
