import type { Id } from '@root/core/domain/types';
import type { TExpenseDTO } from '@root/core/modules/expense/domain/expenseEntity/types';

export interface IExpenseDataSource {
	getItems(): Record<Id, TExpenseDTO>;
	setItems(values: Record<Id, TExpenseDTO>): IExpenseDataSource;
	setOne(expense: TExpenseDTO): IExpenseDataSource;
	deleteOne(id: Id): IExpenseDataSource;
}
