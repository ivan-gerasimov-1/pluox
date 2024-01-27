import type { ECurrency } from '@core/infrastructure/currency/types';
import { ExpensesApi } from '@core/infrastructure/expensesApi/ExpensesApi';
import { Amount } from '@domain/amount';
import { TMonth } from '@domain/amount/useCases/types';
import { Expense } from '@domain/expense';
import type { TExpense } from '@domain/expense/types';
import { Expenses, type TExpenses } from '@domain/expenses';
import type { Id, TCategory, TISODateString } from '@domain/types';
import { delay } from '@utils/delay';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type TExpenseCreatePayload = {
	amount: number;
	currency: ECurrency;
	comment: string;
	category: TCategory;
	date?: TISODateString;
};

interface IExpensesStore {
	readonly operations: TExpenses;

	addExpense(payload: TExpenseCreatePayload): Promise<void>;
	/** @todo Not Implemented */
	editExpense(payload: unknown): void;
	deleteExpense(id: Id): void;

	getTotalAmount(): number;
	getMonthlyAmount(month: TMonth): number;

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

				async addExpense(payload: TExpenseCreatePayload): Promise<void> {
					const prevState = get();

					const expense = Expense.create(
						payload.amount,
						payload.currency,
						payload.comment,
						payload.category,
						payload.date,
					);

					try {
						const expensesApi = ExpensesApi.getInstance();
						const response = await expensesApi.create(expense.toObject());

						// @ts-expect-error
						expense.__dangerouslyUpdateId(response.id);
					} catch {
						// DO NOTHING FOR NOW
					}

					const expenses = Expenses.create(prevState.operations);

					set({
						operations: expenses //
							.add(expense)
							.get(),
					});
				},

				/** @todo Not Implemented */
				editExpense(payload: unknown): void {
					//
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

				getMonthlyAmount(month: TMonth): number {
					let state = get();
					let expenses = Expenses.create(state.operations);
					let amount = Amount.create(expenses);

					return amount.getMonthly(month);
				},
			};
		},
		{
			name: '@savee/store/$expenses',
			storage: createJSONStorage(() => localStorage),
		},
	),
);
