import type { IAppConfig } from '@root/core/modules/settings/domain/appConfig/types';
import type {
	ITemporal,
	TMonth,
	TYear,
} from '@root/core/domain/temporal/types';
import type { ICurrencyRateService } from '@root/core/modules/currency/application/currencyRateService/types';
import type { IExpenseRepository } from '@root/core/modules/expense/domain/expenseRepository/types';
import type { IExpenseAmountService } from './types';

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
