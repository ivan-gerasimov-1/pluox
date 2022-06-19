import { Expense } from '@domain/expense';
import type { TExpense } from '@domain/expense/types';
import { Expenses, type TExpenses } from '@domain/expenses';
import create from 'zustand';
import { persist } from 'zustand/middleware';

type TExpenseCreatePayload = {
	amount: number;
};

interface IExpensesStore {
	readonly operations: TExpenses;

	addExpense(payload: TExpenseCreatePayload): void;

	getTotalAmount(): number;
	getList(): TExpense[];
}

export let useExpensesStore = create(
	persist<IExpensesStore>(
		(set, get) => {
			return {
				operations: {},

				addExpense(payload: TExpenseCreatePayload): void {
					set((prevState) => {
						const expense = Expense.create(payload.amount);

						return {
							...prevState,
							operations: Expenses.create(prevState.operations) //
								.add(expense)
								.get(),
						};
					});
				},

				getTotalAmount(): number {
					const state = get();

					return Expenses.create(state.operations) //
						.getTotalAmount();
				},

				getList(): TExpense[] {
					const state = get();

					return Expenses.create(state.operations) //
						.list();
				},
			};
		},
		{
			name: '@savee/store/$expenses',
			getStorage: () => localStorage,
		}
	)
);
