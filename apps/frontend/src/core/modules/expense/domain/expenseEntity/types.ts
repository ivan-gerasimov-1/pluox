import { type IEntity } from '@core/infrastructure/entity/types';
import type { TExpenseDTO } from '@root/core/modules/expense/application/dto/expenseDTO';

export interface IExpense extends IEntity<TExpenseDTO> {
	toObject(): TExpenseDTO;
}
