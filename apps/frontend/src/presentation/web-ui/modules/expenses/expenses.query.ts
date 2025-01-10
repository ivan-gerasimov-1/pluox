import type { TISODateString, TMonth } from '@root/core/domain/temporal/types';
import type {
	TExpenseDTO,
	TExpenseCreateDTO,
	TExpenseUpdateDTO,
} from '@root/core/modules/expense/application/dto/expenseDTO';
import type { Id } from '@domain/types';

import { resolveService } from '@root/core/infrastructure/serviceContainer/resolveService';

import { EServiceToken } from '@root/presentation/web-ui/modules/serviceContainer/enums';

export const QUERY_EXPENSES_LIST = Symbol('expenseList').description;
export const QUERY_EXPENSES_TOTAL_AMOUNT = Symbol('totalAmount').description;
export const QUERY_EXPENSES_MONTHLY_AMOUNT =
	Symbol('monthlyAmount').description;
export const QUERY_EXPENSES_DAILY_AMOUNT = Symbol('dailyAmount').description;

export function addOne(payload: TExpenseCreateDTO): void {
	let createExpenseUseCase = resolveService(
		EServiceToken.EXPENSE_CREATE_USE_CASE,
	);

	createExpenseUseCase.execute(payload);
}

export function updateOne(id: Id, payload: TExpenseUpdateDTO): void {
	let updateExpenseUseCase = resolveService(
		EServiceToken.EXPENSE_UPDATE_USE_CASE,
	);

	updateExpenseUseCase.execute(id, payload);
}

export function deleteOne(id: Id): void {
	let deleteExpenseUseCase = resolveService(
		EServiceToken.EXPENSE_DELETE_USE_CASE,
	);

	deleteExpenseUseCase.execute(id);
}

export function getOne(id: Id): TExpenseDTO | null {
	let expenseQueryService = resolveService(EServiceToken.EXPENSE_QUERY_SERVICE);

	return expenseQueryService.getExpenseById(id);
}

export function getList(query?: {
	dateFrom?: TISODateString;
	dateTo?: TISODateString;
}): TExpenseDTO[] {
	let expenseRepository = resolveService(EServiceToken.EXPENSE_REPOSITORY);
	let expenseMapper = resolveService(EServiceToken.EXPENSE_MAPPER);

	let expenses = expenseRepository.findMany(
		query && {
			filter: {
				dateFrom: query?.dateFrom,
				dateTo: query?.dateTo,
			},
		},
	);

	return expenses.items.map((expense) => {
		return expenseMapper.toDTO(expense);
	});
}

export function getTotalAmount(): number {
	let expenseService = resolveService(EServiceToken.EXPENSE_SERVICE);

	return expenseService.getTotalByYear();
}

export function getMonthlyAmount(month: TMonth): number {
	let expenseService = resolveService(EServiceToken.EXPENSE_SERVICE);

	return expenseService.getTotalByMonth(month);
}

export function getDailyAmount(): number {
	let expenseService = resolveService(EServiceToken.EXPENSE_SERVICE);

	return expenseService.getTotalByDay();
}
