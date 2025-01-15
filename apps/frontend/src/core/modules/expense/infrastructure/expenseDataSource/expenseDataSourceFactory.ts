import type { IDatabase } from '@root/core/infrastructure/database/types';
import { EXPENSE_STORAGE_ID } from '@root/core/modules/expense/infrastructure/expenseDataSource/constants';
import { ExpenseDataSource } from '@root/core/modules/expense/infrastructure/expenseDataSource/expenseDataSource';
import type { IExpenseDataSource } from '@root/core/modules/expense/infrastructure/expenseDataSource/types';

export function expenseDataSourceFactory(
	customStorage: IDatabase,
): IExpenseDataSource {
	let collection = customStorage.collection(EXPENSE_STORAGE_ID);

	return new ExpenseDataSource(collection);
}
