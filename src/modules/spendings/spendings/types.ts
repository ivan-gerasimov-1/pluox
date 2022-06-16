import type { ISpending, TSpending } from '@modules/spendings/spending/types';
import type { Id } from '@modules/types';

export interface ISpendings {
	add(spending: ISpending): this;
	getAll(): TSpendings;

	list(): TSpending[];

	getTotalAmount(): number;
}

export type TSpendings = Record<Id, TSpending>;
