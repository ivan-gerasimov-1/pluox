import type { ICustomStorage } from '@root/core/infrastructure/customStorage/types';
import { EXPENSE_STORAGE_ID } from '@root/core/modules/expense/infrastructure/expenseDataSource/constants';
import { ExpenseDataSource } from '@root/core/modules/expense/infrastructure/expenseDataSource/expenseDataSource';
import type { IExpenseDataSource } from '@root/core/modules/expense/infrastructure/expenseDataSource/types';

export function expenseDataSourceFactory(
	customStorage: ICustomStorage,
): IExpenseDataSource {
	let collection = customStorage.collection(EXPENSE_STORAGE_ID);

	return new ExpenseDataSource(collection);
}
