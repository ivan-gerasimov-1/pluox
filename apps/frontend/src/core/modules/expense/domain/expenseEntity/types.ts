import { type IEntity } from '@root/core/domain/entity/types';
import type { TCategory } from '@root/core/domain/types';
import type { TISODateString } from '@root/core/infrastructure/temporal/types';
import type { ECurrency } from '@root/core/modules/currency/domain/types';
import type { TExpenseDTO } from '@root/core/modules/expense/application/dto/expenseDTO';

export interface IExpense extends IEntity<TExpenseDTO> {
	readonly amount: number;
	readonly currency: ECurrency;
	readonly date: TISODateString;
	readonly category: TCategory;

	toDTO(): TExpenseDTO;
}
