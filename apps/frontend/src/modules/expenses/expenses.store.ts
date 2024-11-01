import { ExpensesApi } from '@core/infrastructure/expensesApi/ExpensesApi';
import { TMonth } from '@domain/amount/useCases/types';
import { Expense } from '@domain/expense';
import type { TExpense, TExpenseCreateDTO } from '@domain/expense/types';
import { Expenses, type TExpenses } from '@domain/expenses';
import type { Id, TISODateString } from '@domain/types';
import { dateFn } from '@modules/date/date';
import {
	getList,
	getMonthlyAmount,
	getTotalAmount,
} from '@modules/expenses/expenses.query';
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

/**
 * @deprecated Use expenses.query.ts instead
 */
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
						/**
						 * @todo Don’t use dateFn directly
						 */
						dateFn.tz.guess(),
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

				getList,
				getTotalAmount,
				getMonthlyAmount,
			};
		},
		{
			name: '@savee/store/$expenses',
			storage: createJSONStorage(() => localStorage),
		},
	),
);
