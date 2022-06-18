import type { Id, TISODateString } from '@modules/types';

export interface IExpense {
	readonly id: Id;
	toObject(): TExpense;
}

export type TExpense = {
	id: Id;
	/**
	 * @todo
	 * - Use specialized library to store big numbers
	 */
	amount: number;
	dateCreated: TISODateString;
};
