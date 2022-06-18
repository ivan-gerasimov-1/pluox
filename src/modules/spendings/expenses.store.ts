import { Expense } from '@modules/spendings/expense';
import type { TExpense } from '@modules/spendings/expense/types';
import { Expenses, type TExpenses } from '@modules/spendings/expenses';
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
		const spending = new Expense(payload.amount);
		const spendings = new Expenses(prevState.operations);

		spendings.add(spending);

		return {
			...prevState,
			operations: spendings.getAll(),
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
