import type { Id, TDescription, TCategory } from '@root/core/domain/types';
import type { TISODateString } from '@root/core/domain/temporal/types';
import type { ECurrency } from '@root/core/modules/currency/domain/types';

export type TExpenseDTO = {
	id: Id;
	userId: Id;
	/**
	 * @todo
	 * - Use specialized library to store big numbers
	 */
	amount: number;
	currency: ECurrency;
	description: TDescription;
	category: TCategory;
	date: TISODateString;
	createdAt: TISODateString;
	modifiedAt: TISODateString;
	timezone: string;
};

export type TExpenseCreateDTO = Pick<
	TExpenseDTO,
	'amount' | 'currency' | 'description' | 'category'
> &
	Partial<Pick<TExpenseDTO, 'date'>>;

export type TExpenseUpdateDTO = Partial<
	Pick<TExpenseDTO, 'amount' | 'currency' | 'description' | 'category' | 'date'>
>;
