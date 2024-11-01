import { Amount } from '@domain/amount/Amount';
import type { TMonth } from '@domain/amount/useCases/types';
import type { TExpense } from '@domain/expense/types';
import { Expenses } from '@domain/expenses/expenses';
import type { TISODateString } from '@domain/types';

export const QUERY_EXPENSES_LIST = Symbol('expenseList');
export const QUERY_EXPENSES_TOTAL_AMOUNT = Symbol('totalAmount');
export const QUERY_EXPENSES_MONTHLY_AMOUNT = Symbol('monthlyAmount');

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
