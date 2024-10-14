import type { IAppStorage } from '@core/infrastructure/appStorage/types';
import type { TExpense } from '@domain/expense/types';
import type { Id } from '@domain/types';

export interface IExpensesStorage extends IAppStorage {
	getItems(): Record<Id, TExpense>;
	setItems(values: Record<Id, TExpense>): IExpensesStorage;
}
