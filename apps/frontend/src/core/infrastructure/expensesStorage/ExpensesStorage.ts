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
	static #instance: IExpensesStorage;

	private readonly STORAGE_ID: string = 'store/$expenses';

	private constructor() {
		super();
	}

	public static getInstance(): IExpensesStorage {
		if (!this.#instance) {
			this.#instance = new ExpensesStorage();
		}

		return this.#instance;
	}

	public getItems(): Record<Id, TExpense> {
		const value = this.get(this.STORAGE_ID);

		if (!value || !value.state) {
			return {};
		}

		return value.state.operations;
	}

	public setItems(values: Record<Id, TExpense>): IExpensesStorage {
		const value = this.get(this.STORAGE_ID);

		this.set(this.STORAGE_ID, {
			...value,
			state: {
				...value?.state,
				operations: values,
			},
		});

		return this;
	}
}
