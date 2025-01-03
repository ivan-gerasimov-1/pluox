import { type IEntity } from '@root/core/domain/entity/types';
import type { TCategory, TDescription } from '@root/core/domain/types';
import type { TISODateString } from '@root/core/infrastructure/temporal/types';
import type { ECurrency } from '@root/core/modules/currency/domain/types';
import type { TExpenseDTO } from '@root/core/modules/expense/application/dto/expenseDTO';

export interface IExpense extends IEntity<TExpenseDTO> {
	readonly amount: number;
	readonly currency: ECurrency;

	readonly category: TCategory;

	readonly comment: TDescription;

	readonly date: TISODateString;
	readonly createdAt: TISODateString;
	readonly modifiedAt: TISODateString;

	readonly timezone: string;
}
