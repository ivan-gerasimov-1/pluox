import type { IEntity } from '@pluox/core/src/domain/entity/types';
import type { TISODateString } from '@pluox/core/src/domain/temporal/types';
import type { Id, TCategory, TDescription } from '@pluox/core/src/domain/types';

import type { TCurrency } from '@pluox/core/src/modules/currency/domain/types';

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
