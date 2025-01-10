import type {
	ITemporal,
	TMonth,
	TYear,
} from '@root/core/domain/temporal/types';
import type { TExpenseDTO } from '@root/core/modules/expense/application/dto/expenseDTO';
import type { IExpenseQueryService } from '@root/core/modules/expense/application/expenseQueryService/types';
import type { IExpenseRepository } from '@root/core/modules/expense/domain/expenseRepository/types';

export class ExpenseQueryService implements IExpenseQueryService {
	constructor(
		private readonly expenseRepository: IExpenseRepository,
		private readonly temporal: ITemporal,
	) {}

	public getDailyExpenses(): TExpenseDTO[] {
		const startOfDay = this.temporal.getStartOfDay();
		const endOfDay = this.temporal.getEndOfDay();

		const result = this.expenseRepository.findMany({
			filter: {
				dateFrom: startOfDay,
				dateTo: endOfDay,
			},
		});

		return result.items;
	}

	public getMonthlyExpenses(
		month: TMonth,
		year: TYear = new Date().getFullYear(),
	): TExpenseDTO[] {
		const startOfMonth = this.temporal.getStartOfMonth(month, year);
		const endOfMonth = this.temporal.getEndOfMonth(month, year);

		const result = this.expenseRepository.findMany({
			filter: {
				dateFrom: startOfMonth,
				dateTo: endOfMonth,
			},
		});

		return result.items;
	}

	public getYearlyExpenses(
		year: TYear = new Date().getFullYear(),
	): TExpenseDTO[] {
		const startOfYear = this.temporal.getStartOfYear(year);
		const endOfYear = this.temporal.getEndOfYear(year);

		const result = this.expenseRepository.findMany({
			filter: {
				dateFrom: startOfYear,
				dateTo: endOfYear,
			},
		});

		return result.items;
	}
}
