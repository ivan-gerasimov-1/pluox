import type { TMonth, TYear } from '@core/domain/temporal/types';

import type { TExpenseDTO } from '@core/modules/expense/application/dto/expenseDTO';
import type {
	IExpenseAmountService,
	TAmountByCategory,
} from '@core/modules/expense/application/expenseAmountService/types';
import type {
	IExpenseGroupingService,
	TExpenseGroupByDate,
} from '@core/modules/expense/application/expenseGroupingService/types';
import type { IExpenseQueryService } from '@core/modules/expense/application/expenseQueryService/types';
import type { IExpenseService } from '@core/modules/expense/application/expenseService/types';

export class ExpenseService implements IExpenseService {
	constructor(
		private readonly expenseGroupingService: IExpenseGroupingService,
		private readonly expenseAmountService: IExpenseAmountService,
		private readonly expenseQueryService: IExpenseQueryService,
	) {}
	public getTotalByYear(year: TYear = new Date().getFullYear()): number {
		let expenses = this.expenseQueryService.getYearlyExpenses(year);

		return this.expenseAmountService.calculateAmount(expenses);
	}

	public getTotalByMonth(
		month: TMonth,
		year: TYear = new Date().getFullYear(),
	): number {
		let expenses = this.expenseQueryService.getMonthlyExpenses(month, year);

		return this.expenseAmountService.calculateAmount(expenses);
	}

	public getTotalByDay(): number {
		let expenses = this.expenseQueryService.getDailyExpenses();

		return this.expenseAmountService.calculateAmount(expenses);
	}

	public getMonthlyTotalByCategory(
		month: TMonth,
		year: TYear = new Date().getFullYear(),
	): TAmountByCategory[] {
		let expenses = this.expenseQueryService.getMonthlyExpenses(month, year);

		return this.expenseAmountService.calculateAmountByCategory(expenses);
	}

	public groupExpenseByDate(expenses: TExpenseDTO[]): TExpenseGroupByDate[] {
		return this.expenseGroupingService.groupByDay(expenses);
	}
}
