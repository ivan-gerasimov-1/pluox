import { Amount } from '@domain/amount/Amount';
import type { TMonth } from '@domain/amount/useCases/types';
import { Expenses } from '@domain/expenses/expenses';

export const QUERY_EXPENSES_TOTAL_AMOUNT = Symbol('totalAmount');
export const QUERY_EXPENSES_MONTHLY_AMOUNT = Symbol('monthlyAmount');

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
