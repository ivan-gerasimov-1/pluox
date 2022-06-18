import type { IExpense, TExpense } from '@domain/expense/types';
import type { Id } from '@domain/types';

export interface IExpenses {
	add(expense: IExpense): this;

	get(): TExpenses;
	get(id: Id): TExpense;
	get(id?: Id): TExpenses | TExpense;

	list(): TExpense[];

	getTotalAmount(): number;
}

export type TExpenses = Record<Id, TExpense>;
