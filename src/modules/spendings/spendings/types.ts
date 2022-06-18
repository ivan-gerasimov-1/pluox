import type { IExpense, TExpense } from '@modules/spendings/expense/types';
import type { Id } from '@modules/types';

export interface ISpendings {
	add(spending: IExpense): this;
	getAll(): TSpendings;

	list(): TExpense[];

	getTotalAmount(): number;
}

export type TSpendings = Record<Id, TExpense>;
