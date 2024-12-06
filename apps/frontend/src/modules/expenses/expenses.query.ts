import { getGlobalContainer } from '@root/diContainer';

import { ExpensesStorage } from '@core/infrastructure/expensesStorage/ExpensesStorage';

import { Amount } from '@domain/amount/Amount';
import type { TMonth } from '@domain/amount/useCases/types';
import { Expense } from '@domain/expense/expense';
import type { TExpense, TExpenseCreateDTO } from '@domain/expense/types';
import { IExpenses } from '@domain/expenses/types';
import type { Id, TISODateString } from '@domain/types';

import { dateFn } from '@modules/date/date';
import { EServiceToken } from '@modules/serviceContainer/types';

export const QUERY_EXPENSES_LIST = Symbol('expenseList');
export const QUERY_EXPENSES_TOTAL_AMOUNT = Symbol('totalAmount');
export const QUERY_EXPENSES_MONTHLY_AMOUNT = Symbol('monthlyAmount');

/**
 * @todo Replace with proper DI
 */
function getExpensesService(): IExpenses {
	let globalContainer = getGlobalContainer();
	let expenses = globalContainer.get(EServiceToken.EXPENSES);

	return expenses;
}

/**
 * @todo
 * 1. Encapsulate logic in a separate class
 */
export function addOne(payload: TExpenseCreateDTO): void {
	let expenses = getExpensesService();

	let expense = Expense.create(
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

	ExpensesStorage.getInstance() //
		.setItems(
			expenses //
				.add(expense)
				.get(),
		);
}

/**
 * @todo Encapsulate logic in a separate class
 */
export function deleteOne(id: Id): void {
	let expensesSerice = getExpensesService();
	let expenses = expensesSerice.delete(id).get();

	ExpensesStorage.getInstance() //
		.setItems(expenses);
}

export function getOne(id: Id): TExpense {
	let expenses = getExpensesService();

	return expenses //
		.get(id);
}

export function getList(query?: {
	dateFrom?: TISODateString;
	dateTo?: TISODateString;
}): TExpense[] {
	let expenses = getExpensesService();

	return expenses //
		.list(
			query && {
				dateFrom: query?.dateFrom,
				dateTo: query?.dateTo,
			},
		);
}

export function getTotalAmount(): number {
	let expenses = getExpensesService();
	let amount = Amount.create(expenses);

	return amount.getTotalByYear();
}

export function getMonthlyAmount(month: TMonth): number {
	let expenses = getExpensesService();
	let amount = Amount.create(expenses);

	return amount.getTotalByMonth(month);
}
