import type { IEntity } from '@root/core/domain/entity/types';
import type { TCategory, TDescription } from '@root/core/domain/types';
import type { TISODateString } from '@root/core/domain/temporal/types';
import type { ECurrency } from '@root/core/modules/currency/domain/types';

export interface IExpense extends IEntity {
	readonly userId: string;

	readonly amount: number;
	readonly currency: ECurrency;

	readonly category: TCategory;
	readonly comment: TDescription;
	readonly date: TISODateString;
	readonly timezone: string;
}
