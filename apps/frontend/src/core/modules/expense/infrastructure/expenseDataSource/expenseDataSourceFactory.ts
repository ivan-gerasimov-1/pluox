import { EXPENSE_STORAGE_ID } from '@root/core/modules/expense/infrastructure/expenseDataSource/constants';
import { ExpenseDataSource } from '@root/core/modules/expense/infrastructure/expenseDataSource/expenseDataSource';
import type { IExpenseDataSource } from '@root/core/modules/expense/infrastructure/expenseDataSource/types';

export function expenseDataSourceFactory(storage: Storage): IExpenseDataSource {
	return new ExpenseDataSource(storage, {
		id: EXPENSE_STORAGE_ID,
	});
}
