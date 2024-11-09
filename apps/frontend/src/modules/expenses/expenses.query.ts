import { ExpensesStorage } from '@core/infrastructure/expensesStorage/ExpensesStorage';
import { Amount } from '@domain/amount/Amount';
import type { TMonth } from '@domain/amount/useCases/types';
import type { TExpense } from '@domain/expense/types';
import { Expenses } from '@domain/expenses/expenses';
import type { Id, TISODateString } from '@domain/types';

export const QUERY_EXPENSES_LIST = Symbol('expenseList');
export const QUERY_EXPENSES_TOTAL_AMOUNT = Symbol('totalAmount');
export const QUERY_EXPENSES_MONTHLY_AMOUNT = Symbol('monthlyAmount');

/**
 * @todo Encapsulate logic in a separate class
 */
export function deleteOne(id: Id): void {
	let expenses = Expenses.getInstance().delete(id).get();

	ExpensesStorage.getInstance() //
		.setItems(expenses);
}

export function getOne(id: Id): TExpense {
	return Expenses.getInstance() //
		.get(id);
}

export function getList(query?: {
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
}

export function getTotalAmount(): number {
	let expenses = Expenses.getInstance();
	let amount = Amount.create(expenses);

	return amount.getTotalByYear();
}

export function getMonthlyAmount(month: TMonth): number {
	let expenses = Expenses.getInstance();
	let amount = Amount.create(expenses);

	return amount.getTotalByMonth(month);
}
