import type { TMonth, TYear } from '@root/core/domain/temporal/types';
import type { TExpenseDTO } from '@root/core/modules/expense/application/dto/expenseDTO';
import type { IExpenseAmountService } from '@root/core/modules/expense/application/expenseAmountService/types';
import type {
	IExpenseGroupingService,
	TExpenseGroupByDate,
} from '@root/core/modules/expense/application/expenseGroupingService/types';
import type { IExpenseService } from '@root/core/modules/expense/application/expenseService/types';
import type {
	IMonthlyExpensesByCategoryUseCase,
	TMonthlyExpensesByCategory,
} from '@root/core/modules/expense/application/expenseUseCases/monthlyExpensesByCategoryUseCase';

export class ExpenseService implements IExpenseService {
	constructor(
		private readonly monthlyExpensesByCategoryUseCase: IMonthlyExpensesByCategoryUseCase,
		private readonly expenseGroupingService: IExpenseGroupingService,
		private readonly expenseAmountService: IExpenseAmountService,
	) {}
	public getTotalByYear(year: TYear = new Date().getFullYear()): number {
		return this.expenseAmountService.getYearlyAmount(year);
	}

	public getTotalByMonth(
		month: TMonth,
		year: TYear = new Date().getFullYear(),
	): number {
		return this.expenseAmountService.getMonthlyAmount(month, year);
	}

	public getTotalByDay(): number {
		return this.expenseAmountService.getDailyAmount();
	}

	public getMonthlyExpensesByCategory(
		month: TMonth,
	): TMonthlyAmountByCategory[] {
		return this.expenseAmountService.getMonthlyAmountByCategory(month);
	}

	public groupExpenseByDate(expenses: TExpenseDTO[]): TExpenseGroupByDate[] {
		return this.expenseGroupingService.groupByDay(expenses);
	}
}
