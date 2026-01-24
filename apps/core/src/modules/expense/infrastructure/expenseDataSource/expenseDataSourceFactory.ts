import type { IDatabase } from '@core/infrastructure/database/types';
import { EXPENSE_STORAGE_ID } from '@core/modules/expense/infrastructure/expenseDataSource/constants';
import { ExpenseDataSource } from '@core/modules/expense/infrastructure/expenseDataSource/expenseDataSource';
import type { IExpenseDataSource } from '@core/modules/expense/infrastructure/expenseDataSource/types';

export function expenseDataSourceFactory(
	customStorage: IDatabase,
): IExpenseDataSource {
	let collection = customStorage.collection(EXPENSE_STORAGE_ID);

	return new ExpenseDataSource(collection);
}
