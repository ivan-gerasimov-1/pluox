import type {
	Id,
	TComment,
	TCategory,
	TISODateString,
} from '@root/core/domain/types';
import type { ECurrency } from '@root/core/infrastructure/currency/types';

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

export type TExpenseCreateDTO = Pick<
	TExpenseDTO,
	'amount' | 'currency' | 'comment' | 'category'
> &
	Partial<Pick<TExpenseDTO, 'date'>>;

export type TExpenseUpdateDTO = Partial<
	Pick<TExpenseDTO, 'amount' | 'currency' | 'comment' | 'category' | 'date'>
>;
