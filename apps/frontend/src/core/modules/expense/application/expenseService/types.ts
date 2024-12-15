import type { Id } from '@root/core/domain/types';
import type {
	TExpenseCreateDTO,
	TExpenseUpdateDTO,
} from '@root/core/modules/expense/domain/expenseEntity/types';

export interface IExpenseService {
	createExpense(payload: TExpenseCreateDTO): IExpenseService;
	deleteExpense(id: Id): IExpenseService;
	updateExpense(id: Id, payload: TExpenseUpdateDTO): IExpenseService;
}
