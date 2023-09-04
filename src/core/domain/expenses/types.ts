import type { IExpense, TExpense } from '@domain/expense/types';
import type { Id, TISODateString } from '@domain/types';

export interface IExpenses {
	add(expense: IExpense): this;

	get(): TExpenses;
	get(id: Id): TExpense;
	get(id?: Id): TExpenses | TExpense;

	list(): TExpense[];
	delete(id: Id): IExpenses;
}

export type TExpenses = Record<Id, TExpense>;
