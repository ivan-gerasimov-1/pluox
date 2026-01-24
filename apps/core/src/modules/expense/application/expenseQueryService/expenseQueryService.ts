import type { ITemporal, TMonth, TYear } from '@core/domain/temporal/types';
import type { Id } from '@core/domain/types';
import type { TExpenseDTO } from '@core/modules/expense/application/dto/expenseDTO';
import type { IExpenseQueryService } from '@core/modules/expense/application/expenseQueryService/types';
import type { IExpenseRepository } from '@core/modules/expense/domain/expenseRepository/types';
import type { IExpenseMapper } from '@core/modules/expense/infrastructure/expenseMapper/types';

export class ExpenseQueryService implements IExpenseQueryService {
	constructor(
		private readonly expenseRepository: IExpenseRepository,
		private readonly expenseMapper: IExpenseMapper,
		private readonly temporal: ITemporal,
	) {}

	public getExpenseById(id: Id): TExpenseDTO | null {
		const expense = this.expenseRepository.findById(id);

		if (!expense) {
			return null;
		}

		return this.expenseMapper.toDTO(expense);
	}

	public getDailyExpenses(): TExpenseDTO[] {
		const startOfDay = this.temporal.getStartOfDay();
		const endOfDay = this.temporal.getEndOfDay();

		const result = this.expenseRepository.findMany({
			filter: {
				dateFrom: startOfDay,
				dateTo: endOfDay,
			},
		});

		return result.items.map(this.expenseMapper.toDTO);
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

		return result.items.map(this.expenseMapper.toDTO);
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

		return result.items.map(this.expenseMapper.toDTO);
	}
}
