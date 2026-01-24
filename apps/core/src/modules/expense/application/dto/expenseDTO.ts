import type { TISODateString } from '@core/domain/temporal/types';
import type { Id, TCategory, TDescription } from '@core/domain/types';
import type { TCurrency } from '@core/modules/currency/domain/types';

export type TExpenseDTO = {
	id: Id;
	userId: Id;
	/**
	 * @todo
	 * - Use specialized library to store big numbers
	 */
	amount: number;
	currency: TCurrency;
	description: TDescription;
	category: TCategory | null;
	venue: Id | null;
	date: TISODateString;
	createdAt: TISODateString;
	modifiedAt: TISODateString;
	timezone: string;
};

export type TExpenseCreateDTO = Pick<
	TExpenseDTO,
	'amount' | 'currency' | 'description' | 'category' | 'venue'
> &
	Partial<Pick<TExpenseDTO, 'date'>>;

export type TExpenseUpdateDTO = Partial<
	Pick<
		TExpenseDTO,
		'amount' | 'currency' | 'description' | 'category' | 'date' | 'venue'
	>
>;
