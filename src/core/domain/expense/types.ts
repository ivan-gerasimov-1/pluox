import { type ECurrency } from '@core/infrastructure/currency/types';
import type { Id, TISODateString } from '@domain/types';

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
	currency: ECurrency;
	comment: string;
	dateCreated: TISODateString;
	dateModified: TISODateString;
};
