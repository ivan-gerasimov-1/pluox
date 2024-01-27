import { type ECurrency } from '@core/infrastructure/currency/types';
import { type IEntity } from '@core/infrastructure/entity/types';
import type { Id, TCategory, TISODateString } from '@domain/types';

export interface IExpense extends IEntity<TExpense> {
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
	category: TCategory;
	date: TISODateString;
	dateCreated: TISODateString;
	dateModified: TISODateString;
};
