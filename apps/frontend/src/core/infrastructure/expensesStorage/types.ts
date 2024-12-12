import type { IDataSource } from '@core/infrastructure/appStorage/types';
import type { TExpense } from '@root/core/modules/expense/domain/expenseEntity/types';
import type { Id } from '@domain/types';

export interface IExpensesStorage extends IDataSource {
	getItems(): Record<Id, TExpense>;
	setItems(values: Record<Id, TExpense>): IExpensesStorage;
}
