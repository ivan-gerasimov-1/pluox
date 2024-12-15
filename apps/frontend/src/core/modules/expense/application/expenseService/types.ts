import type { Id } from '@root/core/domain/types';
import type {
	TExpenseCreateDTO,
	TExpenseUpdateDTO,
} from '@root/core/modules/expense/application/dto/expenseDTO';
import type { TMonth } from '@root/core/modules/expense/domain/expenseUseCases/totalAmountUseCase/types';

export interface IExpenseService {
	createExpense(payload: TExpenseCreateDTO): IExpenseService;
	deleteExpense(id: Id): IExpenseService;
	updateExpense(id: Id, payload: TExpenseUpdateDTO): IExpenseService;

	/**
	 * @todo Add year to the class interface
	 */
	getTotalByYear(): number;
	/**
	 * @todo Add year to the class interface
	 */
	getTotalByMonth(month: TMonth): number;
}
