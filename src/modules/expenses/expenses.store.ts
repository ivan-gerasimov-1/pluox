import { Expense } from '@domain/expense';
import type { TExpense } from '@domain/expense/types';
import { Expenses, type TExpenses } from '@domain/expenses';
import { withPersist } from '@root/utils/store';
import { createApi, createStore } from 'effector';

type TExpenseCreatePayload = {
	amount: number;
};

export type TExpensesStore = {
	operations: TExpenses;
};

export let $expenses = withPersist(
	createStore<TExpensesStore>(
		{
			operations: {},
		},
		{
			name: '$expenses',
		}
	)
);

export let $expensesApi = createApi($expenses, {
	create(prevState, payload: TExpenseCreatePayload) {
		const expense = new Expense(payload.amount);
		const expenses = new Expenses(prevState.operations);

		expenses.add(expense);

		return {
			...prevState,
			operations: expenses.getAll(),
		};
	},
});

export let $expensesSelector = {
	total: {
		field: 'operations',
		fn(): number {
			let state = $expenses.getState();
			let expense = new Expenses(state.operations);

			return expense.getTotalAmount();
		},
	},
	list: {
		field: 'operations',
		fn(): TExpense[] {
			let state = $expenses.getState();
			let expense = new Expenses(state.operations);

			return expense.list();
		},
	},
};
