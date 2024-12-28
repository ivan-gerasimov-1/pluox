import type { Id } from '@root/core/domain/types';
import type { TMonth } from '@root/core/infrastructure/temporal/types';
import type {
	TExpenseCreateDTO,
	TExpenseDTO,
	TExpenseUpdateDTO,
} from '@root/core/modules/expense/application/dto/expenseDTO';
import type { TExpenseGroupByDate } from '@root/core/modules/expense/domain/expenseUseCases/groupExpensesByDayUseCase';
import type { TMonthlyExpensesByCategory } from '@root/core/modules/expense/domain/expenseUseCases/monthlyExpensesByCategoryUseCase';

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
	getTotalByDay(): number;

	getMonthlyExpensesByCategory(month: TMonth): TMonthlyExpensesByCategory[];

	groupExpenseByDate(expenses: TExpenseDTO[]): TExpenseGroupByDate[];
}
