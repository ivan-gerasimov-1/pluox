import { type ECurrency } from '@core/infrastructure/currency/types';
import { Amount } from '@domain/amount';
import { Expense } from '@domain/expense';
import type { TExpense } from '@domain/expense/types';
import { Expenses, type TExpenses } from '@domain/expenses';
import { Id, TISODateString } from '@domain/types';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type TExpenseCreatePayload = {
	amount: number;
	currency: ECurrency;
	comment: string;
};

interface IExpensesStore {
	readonly operations: TExpenses;

	addExpense(payload: TExpenseCreatePayload): void;
	deleteExpense(id: Id): void;

	getTotalAmount(): number;
	getMonthlyAmount(currentDate: TISODateString): number;

	getOne(id: Id): TExpense;
	getList(query?: {
		dateFrom?: TISODateString;
		dateTo?: TISODateString;
	}): TExpense[];
}

export let useExpensesStore = create<
	IExpensesStore,
	[
		['zustand/persist', IExpensesStore], //
	]
>(
	persist(
		(set, get) => {
			return {
				operations: {},

				addExpense(payload: TExpenseCreatePayload): void {
					set((prevState) => {
						const expense = Expense.create(
							payload.amount,
							payload.currency,
							payload.comment,
						);

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

				getOne(id: Id): TExpense {
					const state = get();

					return Expenses.create(state.operations) //
						.get(id);
				},

				getList(query?: {
					dateFrom?: TISODateString;
					dateTo?: TISODateString;
				}): TExpense[] {
					const state = get();

					return Expenses.create(state.operations) //
						.list(
							query && {
								dateFrom: query?.dateFrom,
								dateTo: query?.dateTo,
							},
						);
				},

				getTotalAmount(): number {
					let state = get();
					let expenses = Expenses.create(state.operations);
					let amount = Amount.create(expenses);

					return amount.getTotal();
				},

				getMonthlyAmount(currentDate: TISODateString): number {
					let state = get();
					let expenses = Expenses.create(state.operations);
					let amount = Amount.create(expenses);

					return amount.getMonthly(currentDate);
				},
			};
		},
		{
			name: '@savee/store/$expenses',
			storage: createJSONStorage(() => localStorage),
		},
	),
);
