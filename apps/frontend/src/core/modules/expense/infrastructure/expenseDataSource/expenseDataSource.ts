import { LocalStorageDataSource } from '@core/infrastructure/appStorage/AppStorage';

import type { TExpense } from '@root/core/modules/expense/domain/expenseEntity/types';
import type { Id } from '@domain/types';
import type { IExpenseDataSource } from '@root/core/modules/expense/infrastructure/expenseDataSource/types';

export class ExpenseDataSource
	extends LocalStorageDataSource<{
		state?: {
			operations: Record<Id, TExpense>;
		};
	}>
	implements IExpenseDataSource
{
	static readonly #STORAGE_ID: string = 'store/$expenses';

	constructor() {
		super(ExpenseDataSource.#STORAGE_ID);
	}

	public setOne(expense: TExpense): IExpenseDataSource {
		let expenses = this.getItems();

		if (Reflect.has(expenses, expense.id)) {
			throw new Error('Expense already exists');
		}

		Reflect.set(expenses, expense.id, expense);

		this.setItems(expenses);

		return this;
	}

	public deleteOne(id: Id): IExpenseDataSource {
		let expenses = this.getItems();

		if (!Reflect.has(expenses, id)) {
			throw new Error('Expense does not exist');
		}

		Reflect.deleteProperty(expenses, id);

		this.setItems(expenses);

		return this;
	}

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
	public setItems(values: Record<Id, TExpense>): IExpenseDataSource {
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
