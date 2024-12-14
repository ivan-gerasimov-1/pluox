import { type ECurrency } from '@core/infrastructure/currency/types';
import { type IEntity } from '@core/infrastructure/entity/types';
import type { Id, TCategory, TComment, TISODateString } from '@domain/types';

export interface IExpense extends IEntity<TExpenseDTO> {
	toObject(): TExpenseDTO;
}

export type TExpenseDTO = {
	id: Id;
	/**
	 * @todo
	 * - Use specialized library to store big numbers
	 */
	amount: number;
	currency: ECurrency;
	comment: TComment;
	category: TCategory;
	date: TISODateString;
	createdAt: TISODateString;
	modifiedAt: TISODateString;
	timezone: string;
};

export type TExpenseCreateDTO = {
	amount: number;
	currency: ECurrency;
	comment: TComment;
	category: TCategory;
	date?: TISODateString;
};

export type TExpenseUpdateDTO = {
	amount?: number;
	currency?: ECurrency;
	comment?: TComment;
	category?: TCategory;
	date?: TISODateString;
};
