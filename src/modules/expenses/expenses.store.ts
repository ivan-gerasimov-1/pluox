import type { ECurrency } from '@core/infrastructure/currency/types';
import { ExpensesApi } from '@core/infrastructure/expensesApi/ExpensesApi';
import { Amount } from '@domain/amount';
import { TMonth } from '@domain/amount/useCases/types';
import { Expense } from '@domain/expense';
import type { TExpense, TExpenseCreateDTO } from '@domain/expense/types';
import { Expenses, type TExpenses } from '@domain/expenses';
import type { Id, TISODateString } from '@domain/types';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface IExpensesStore {
	readonly operations: TExpenses;

	addExpense(payload: TExpenseCreateDTO): Promise<void>;
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
		(set) => {
			return {
				operations: {},

				async addExpense(payload: TExpenseCreateDTO): Promise<void> {
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

					set({
						operations: Expenses.getInstance() //
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
							operations: Expenses.getInstance() //
								.delete(id)
								.get(),
						};
					});
				},

				getOne(id: Id): TExpense {
					return Expenses.getInstance() //
						.get(id);
				},

				getList(query?: {
					dateFrom?: TISODateString;
					dateTo?: TISODateString;
				}): TExpense[] {
					return Expenses.getInstance() //
						.list(
							query && {
								dateFrom: query?.dateFrom,
								dateTo: query?.dateTo,
							},
						);
				},

				getTotalAmount(): number {
					let expenses = Expenses.getInstance();
					let amount = Amount.create(expenses);

					return amount.getTotalByYear();
				},

				getMonthlyAmount(month: TMonth): number {
					let expenses = Expenses.getInstance();
					let amount = Amount.create(expenses);

					return amount.getTotalByMonth(month);
				},
			};
		},
		{
			name: '@savee/store/$expenses',
			storage: createJSONStorage(() => localStorage),
		},
	),
);
