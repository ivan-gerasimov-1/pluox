import { Expense } from '@domain/expense';
import type { ECurrency, TExpense } from '@domain/expense/types';
import { Expenses, type TExpenses } from '@domain/expenses';
import { Id } from '@domain/types';
import create from 'zustand';
import { persist } from 'zustand/middleware';

type TExpenseCreatePayload = {
	amount: number;
	currency: ECurrency;
};

interface IExpensesStore {
	readonly operations: TExpenses;

	addExpense(payload: TExpenseCreatePayload): void;
	deleteExpense(id: Id): void;

	getTotalAmount(): number;
	getList(): TExpense[];
}

export let useExpensesStore = create<
	IExpensesStore,
	[
		['zustand/persist', IExpensesStore] //
	]
>(
	persist(
		(set, get) => {
			return {
				operations: {},

				addExpense(payload: TExpenseCreatePayload): void {
					set((prevState) => {
						const expense = Expense.create(payload.amount, payload.currency);

						return {
							...prevState,
							operations: Expenses.create(prevState.operations) //
								.add(expense)
								.get(),
						};
					});
				},

				deleteExpense(id: Id): void {
					set((state) => {
						return {
							...state,
							operations: Expenses.create(state.operations) //
								.delete(id)
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
