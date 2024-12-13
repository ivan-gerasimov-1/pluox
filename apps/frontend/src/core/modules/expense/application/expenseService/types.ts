import type { TExpenseCreateDTO } from '@root/core/modules/expense/domain/expenseEntity/types';

export interface IExpenseService {
	createExpense(payload: TExpenseCreateDTO): IExpenseService;
}
