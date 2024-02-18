import type { IExpense, TExpense } from '@domain/expense/types';
import type { Id, TISODateString } from '@domain/types';

export interface IExpenses {
	add(expense: IExpense): this;

	get(): TExpenses;
	get(id: Id): TExpense;
	get(id?: Id): TExpenses | TExpense;

	list(query?: {
		dateFrom?: TISODateString;
		dateTo?: TISODateString;
	}): TExpense[];
	delete(id: Id): IExpenses;

	/** @description temporary solution */
	__addRawExpenses(expenses: TExpenses): IExpenses;

	getMonthlyExpensesByCategory(): { id: Id; total: number }[];
}

export type TExpenses = Record<Id, TExpense>;
