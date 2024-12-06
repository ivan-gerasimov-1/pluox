import { AppStorage } from '@core/infrastructure/appStorage/AppStorage';
import type { IExpensesStorage } from '@core/infrastructure/expensesStorage/types';
import type { TExpense } from '@domain/expense/types';
import type { Id } from '@domain/types';

export class ExpensesStorage
	extends AppStorage<{
		state?: {
			operations: Record<Id, TExpense>;
		};
	}>
	implements IExpensesStorage
{
	public static readonly STORAGE_ID: string = 'store/$expenses';

	public getItems(): Record<Id, TExpense> {
		const value = this.read();

		if (!value?.state) {
			return {};
		}

		return value.state.operations;
	}

	/**
	 * @todo
	 * 1. Simplify structure
	 * 2. Return to update
	 */
	public setItems(values: Record<Id, TExpense>): IExpensesStorage {
		this.delete();
		this.create({
			state: {
				operations: values,
			},
			// version: 0,
		});

		// this.update({
		// 	state: {
		// 		operations: values,
		// 	},
		// });

		return this;
	}
}
