import type { Id, TISODateString } from '@modules/types';

export interface ISpending {
	readonly id: Id;
	toObject(): TSpending;
}

export type TSpending = {
	id: Id;
	/**
	 * @todo
	 * - Use specialized library to store big numbers
	 */
	amount: number;
	dateCreated: TISODateString;
};
