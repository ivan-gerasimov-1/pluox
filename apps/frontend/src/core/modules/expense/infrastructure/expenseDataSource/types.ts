import type { Id } from '@root/core/domain/types';
import type { TExpense } from '@root/core/modules/expense/domain/expenseEntity/types';

export interface IExpenseDataSource {
	getItems(): Record<Id, TExpense>;
	setItems(values: Record<Id, TExpense>): IExpenseDataSource;
	setOne(expense: TExpense): IExpenseDataSource;
	deleteOne(id: Id): IExpenseDataSource;
}
