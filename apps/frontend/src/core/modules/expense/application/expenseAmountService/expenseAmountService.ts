import type {
	ITemporal,
	TMonth,
	TYear,
} from '@root/core/domain/temporal/types';
import type { Id } from '@root/core/domain/types';
import type { ICurrencyRateService } from '@root/core/modules/currency/application/currencyRateService/types';
import type {
	IExpenseAmountService,
	TMonthlyAmountByCategory,
} from '@root/core/modules/expense/application/expenseAmountService/types';
import type { IExpenseRepository } from '@root/core/modules/expense/domain/expenseRepository/types';
import type { IAppConfig } from '@root/core/modules/settings/domain/appConfig/types';

export class ExpenseAmountService implements IExpenseAmountService {
	constructor(
		private readonly expenseRepository: IExpenseRepository,
		private readonly temporal: ITemporal,
		private readonly currencyRatesService: ICurrencyRateService,
		private readonly appConfig: IAppConfig,
	) {}

	public getDailyAmount(): number {
		const startOfDay = this.temporal.getStartOfDay();
		const endOfDay = this.temporal.getEndOfDay();

		return this.getAmount(startOfDay, endOfDay);
	}

	public getMonthlyAmount(month?: TMonth, year?: TYear): number {
		const startOfMonth = this.temporal.getStartOfMonth(month, year);
		const endOfMonth = this.temporal.getEndOfMonth(month, year);

		return this.getAmount(startOfMonth, endOfMonth);
	}

	public getYearlyAmount(year?: TYear): number {
		const startOfYear = this.temporal.getStartOfYear(year);
		const endOfYear = this.temporal.getEndOfYear(year);

		return this.getAmount(startOfYear, endOfYear);
	}

	/**
	 * @todo
	 * 1. Add year
	 * 2. Move grouping by category to ExpenseGroupingService
	 */
	public getMonthlyAmountByCategory(month: TMonth): TMonthlyAmountByCategory[] {
		let currency = this.appConfig.currency;

		let totalAmount = 0;

		let expensesByCategory: Record<
			Id,
			{
				id: Id;
				total: number;
				percentage: number;
			}
		> = {};

		let startDate = this.temporal.getStartOfMonth(month);
		let endDate = this.temporal.getEndOfMonth(month);

		let expenses = this.expenseRepository.findMany({
			filter: {
				dateFrom: startDate,
				dateTo: endDate,
			},
		});

		for (let expense of expenses.items) {
			let category = expense.category || '—';

			if (!expensesByCategory[category]) {
				expensesByCategory[category] = {
					id: category,
					total: 0,
					percentage: 0,
				};
			}

			expensesByCategory[category].total += this.currencyRatesService.convert(
				expense.amount,
				expense.currency,
				currency,
			);
		}

		for (let category in expensesByCategory) {
			totalAmount += expensesByCategory[category].total;
		}

		for (let category in expensesByCategory) {
			expensesByCategory[category].percentage =
				(expensesByCategory[category].total / totalAmount) * 100;
		}

		let result = Object.values(expensesByCategory);

		return result.sort((a, b) => b.total - a.total);
	}

	private getAmount(startDate: string, endDate: string): number {
		let total = 0;
		let targetCurrency = this.appConfig.currency;
		let expenses = this.expenseRepository.findMany({
			filter: {
				dateFrom: startDate,
				dateTo: endDate,
			},
		});

		if (expenses.total === 0) {
			return total;
		}

		for (let expense of expenses.items) {
			total += this.currencyRatesService.convert(
				expense.amount,
				expense.currency,
				targetCurrency,
			);
		}

		return total;
	}
}
