import type { TMonth } from '@root/core/modules/expense/domain/expenseUseCases/totalAmountUseCase/types';
import type {
	TExpenseDTO,
	TExpenseCreateDTO,
	TExpenseUpdateDTO,
} from '@root/core/modules/expense/application/dto/expenseDTO';
import type { Id, TISODateString } from '@domain/types';

import { resolveService } from '@root/core/infrastructure/serviceContainer/resolveService';

import { EServiceToken } from '@root/presentation/web-ui/modules/serviceContainer/enums';

export const QUERY_EXPENSES_LIST = Symbol('expenseList');
export const QUERY_EXPENSES_TOTAL_AMOUNT = Symbol('totalAmount');
export const QUERY_EXPENSES_MONTHLY_AMOUNT = Symbol('monthlyAmount');

export function addOne(payload: TExpenseCreateDTO): void {
	let expenseService = resolveService(EServiceToken.EXPENSE_SERVICE);

	expenseService.createExpense(payload);
}

export function updateOne(id: Id, payload: TExpenseUpdateDTO): void {
	let expenseService = resolveService(EServiceToken.EXPENSE_SERVICE);

	expenseService.updateExpense(id, payload);
}

export function deleteOne(id: Id): void {
	let expenseService = resolveService(EServiceToken.EXPENSE_SERVICE);

	expenseService.deleteExpense(id);
}

export function getOne(id: Id): TExpenseDTO {
	let expenseRepository = resolveService(EServiceToken.EXPENSE_REPOSITORY);

	return expenseRepository //
		.get(id);
}

export function getList(query?: {
	dateFrom?: TISODateString;
	dateTo?: TISODateString;
}): TExpenseDTO[] {
	let expenseRepository = resolveService(EServiceToken.EXPENSE_REPOSITORY);

	return expenseRepository //
		.list(
			query && {
				dateFrom: query?.dateFrom,
				dateTo: query?.dateTo,
			},
		);
}

export function getTotalAmount(): number {
	let expenseService = resolveService(EServiceToken.EXPENSE_SERVICE);

	return expenseService.getTotalByYear();
}

export function getMonthlyAmount(month: TMonth): number {
	let expenseService = resolveService(EServiceToken.EXPENSE_SERVICE);

	return expenseService.getTotalByMonth(month);
}
