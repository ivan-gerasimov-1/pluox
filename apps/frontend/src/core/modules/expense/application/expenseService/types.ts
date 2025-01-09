import type { Id } from '@root/core/domain/types';
import type { TMonth, TYear } from '@root/core/domain/temporal/types';
import type {
	TExpenseDTO,
	TExpenseUpdateDTO,
} from '@root/core/modules/expense/application/dto/expenseDTO';
import type { TMonthlyExpensesByCategory } from '@root/core/modules/expense/domain/expenseUseCases/monthlyExpensesByCategoryUseCase';
import type { TExpenseGroupByDate } from '@root/core/modules/expense/application/expenseGroupingService/types';

export interface IExpenseService {
	/** @deprecated */
	deleteExpense(id: Id): IExpenseService;
	/** @deprecated */
	updateExpense(id: Id, payload: TExpenseUpdateDTO): IExpenseService;

	getTotalByYear(year?: TYear): number;
	getTotalByMonth(month: TMonth, year?: TYear): number;
	getTotalByDay(): number;

	getMonthlyExpensesByCategory(month: TMonth): TMonthlyExpensesByCategory[];

	groupExpenseByDate(expenses: TExpenseDTO[]): TExpenseGroupByDate[];
}
