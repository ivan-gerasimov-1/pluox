import type { IDatabase } from '@pluox/core/src/infrastructure/database/types';

import { EXPENSE_STORAGE_ID } from '@pluox/core/src/modules/expense/infrastructure/expenseDataSource/constants';
import { ExpenseDataSource } from '@pluox/core/src/modules/expense/infrastructure/expenseDataSource/expenseDataSource';
import type { IExpenseDataSource } from '@pluox/core/src/modules/expense/infrastructure/expenseDataSource/types';

export function expenseDataSourceFactory(
	customStorage: IDatabase,
): IExpenseDataSource {
	let collection = customStorage.collection(EXPENSE_STORAGE_ID);

	return new ExpenseDataSource(collection);
}
