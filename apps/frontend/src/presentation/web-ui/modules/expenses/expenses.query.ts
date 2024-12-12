import type { TMonth } from '@domain/amount/useCases/types';
import type {
	TExpense,
	TExpenseCreateDTO,
	TExpenseUpdateDTO,
} from '@root/core/modules/expense/domain/expenseEntity/types';
import type { Id, TISODateString } from '@domain/types';

import { resolveService } from '@root/core/infrastructure/serviceContainer/resolveService';

import { EServiceToken } from '@root/presentation/web-ui/modules/serviceContainer/enums';

export const QUERY_EXPENSES_LIST = Symbol('expenseList');
export const QUERY_EXPENSES_TOTAL_AMOUNT = Symbol('totalAmount');
export const QUERY_EXPENSES_MONTHLY_AMOUNT = Symbol('monthlyAmount');

export function addOne(payload: TExpenseCreateDTO): void {
	let createExpenseUseCase = resolveService(
		EServiceToken.EXPENSE_CREATE_USE_CASE,
	);

	createExpenseUseCase.execute(payload);
}

export function updateOne(payload: TExpenseUpdateDTO): void {
	let updateExpenseUseCase = resolveService(
		EServiceToken.EXPENSE_UPDATE_USE_CASE,
	);

	updateExpenseUseCase.execute(payload);
}

export function deleteOne(id: Id): void {
	let deleteExpenseUseCase = resolveService(
		EServiceToken.EXPENSE_DELETE_USE_CASE,
	);

	deleteExpenseUseCase.execute(id);
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
