import type { IEntity } from '@/core/domain/entity/types';
import type { TISODateString } from '@/core/domain/temporal/types';
import type { Id, TCategory, TDescription } from '@/core/domain/types';
import type { TCurrency } from '@/core/modules/currency/domain/types';

export interface IExpense extends IEntity {
	readonly userId: string;

	amount: number;
	currency: TCurrency;

	venue: Id | null;
	category: TCategory | null;
	description: TDescription;

	date: TISODateString;
	readonly timezone: string;
}
