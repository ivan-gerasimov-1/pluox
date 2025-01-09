import type {
	ITemporal,
	TMonth,
	TYear,
} from '@root/core/domain/temporal/types';
import type { TExpenseDTO } from '@root/core/modules/expense/application/dto/expenseDTO';
import type {
	IExpenseAmountService,
	TMonthlyAmountByCategory,
} from '@root/core/modules/expense/application/expenseAmountService/types';
import type {
	IExpenseGroupingService,
	TExpenseGroupByDate,
} from '@root/core/modules/expense/application/expenseGroupingService/types';
import type { IExpenseService } from '@root/core/modules/expense/application/expenseService/types';
import type { IExpenseRepository } from '@root/core/modules/expense/domain/expenseRepository/types';

export class ExpenseService implements IExpenseService {
	constructor(
		private readonly expenseRepository: IExpenseRepository,
		private readonly temporal: ITemporal,
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

	public getMonthlyTotalByCategory(
		month: TMonth,
		year: TYear = new Date().getFullYear(),
	): TMonthlyAmountByCategory[] {
		let startOfMonth = this.temporal.getStartOfMonth(month, year);
		let endOfMonth = this.temporal.getEndOfMonth(month, year);

		let expenses = this.expenseRepository.findMany({
			filter: {
				dateFrom: startOfMonth,
				dateTo: endOfMonth,
			},
		});

		if (expenses.total === 0) {
			return [];
		}

		return this.expenseAmountService.getMonthlyAmountByCategory(expenses.items);
	}

	public groupExpenseByDate(expenses: TExpenseDTO[]): TExpenseGroupByDate[] {
		return this.expenseGroupingService.groupByDay(expenses);
	}
}
