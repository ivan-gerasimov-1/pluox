import type { TMonth } from '@domain/amount/useCases/types';
import { Expense } from '@domain/expense/expense';
import type { TExpense, TExpenseCreateDTO } from '@domain/expense/types';
import type { Id, TISODateString } from '@domain/types';

import { dateFn } from '@root/modules/temporal/temporal';
import { EServiceToken } from '@modules/serviceContainer/types';
import { resolveService } from '@modules/serviceContainer/resolveService';

export const QUERY_EXPENSES_LIST = Symbol('expenseList');
export const QUERY_EXPENSES_TOTAL_AMOUNT = Symbol('totalAmount');
export const QUERY_EXPENSES_MONTHLY_AMOUNT = Symbol('monthlyAmount');

/**
 * @todo
 * 1. Encapsulate logic in a separate class
 */
export function addOne(payload: TExpenseCreateDTO): void {
	let expenses = resolveService(EServiceToken.EXPENSES);
	let expensesStorage = resolveService(EServiceToken.EXPENSES_STORAGE);

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

	expensesStorage //
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
	let expensesService = resolveService(EServiceToken.EXPENSES);
	let expensesStorage = resolveService(EServiceToken.EXPENSES_STORAGE);

	let expenses = expensesService.delete(id).get();

	expensesStorage //
		.setItems(expenses);
}

export function getOne(id: Id): TExpense {
	let expenses = resolveService(EServiceToken.EXPENSES);

	return expenses //
		.get(id);
}

export function getList(query?: {
	dateFrom?: TISODateString;
	dateTo?: TISODateString;
}): TExpense[] {
	let expenses = resolveService(EServiceToken.EXPENSES);

	return expenses //
		.list(
			query && {
				dateFrom: query?.dateFrom,
				dateTo: query?.dateTo,
			},
		);
}

export function getTotalAmount(): number {
	let amount = resolveService(EServiceToken.AMOUNT);

	return amount.getTotalByYear();
}

export function getMonthlyAmount(month: TMonth): number {
	let amount = resolveService(EServiceToken.AMOUNT);

	return amount.getTotalByMonth(month);
}
