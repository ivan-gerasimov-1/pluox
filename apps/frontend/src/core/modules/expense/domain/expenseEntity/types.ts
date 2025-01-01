import { type IEntity } from '@root/core/domain/entity/types';
import type { TExpenseDTO } from '@root/core/modules/expense/application/dto/expenseDTO';

export interface IExpense extends IEntity<TExpenseDTO> {
	toDTO(): TExpenseDTO;
}
