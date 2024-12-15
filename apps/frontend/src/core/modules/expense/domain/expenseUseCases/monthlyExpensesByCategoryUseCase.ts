import type { TMonth } from '@root/core/modules/expense/domain/expenseUseCases/totalAmountUseCase/types';
import type { Id } from '@root/core/domain/types';
import type { IUseCase } from '@root/core/domain/types';
import type { IAppConfig } from '@root/core/infrastructure/appConfig/AppConfig';
import type { ICurrencyConverter } from '@root/core/infrastructure/currency/currencyConverter/types';
import type { IExpenseRepository } from '@root/core/modules/expense/domain/expenseRepository/types';

export interface IMonthlyExpensesByCategoryUseCase extends IUseCase {
	execute(month: TMonth): TMonthlyExpensesByCategory[];
}

export type TMonthlyExpensesByCategory = {
	id: Id;
	total: number;
	percentage: number;
};

export class MonthlyExpensesByCategoryUseCase
	implements IMonthlyExpensesByCategoryUseCase
{
	constructor(
		private readonly appConfig: IAppConfig,
		private readonly expenseRepository: IExpenseRepository,
		private readonly currencyConverter: ICurrencyConverter,
	) {}

	public execute(month: TMonth): TMonthlyExpensesByCategory[] {
		return this.getMonthlyExpensesByCategory(month);
	}

	private getMonthlyExpensesByCategory(
		month: TMonth,
	): TMonthlyExpensesByCategory[] {
		let currency = this.appConfig.currency;

		let total = 0;

		let expensesByCategory: Record<
			Id,
			{
				id: Id;
				total: number;
				percentage: number;
			}
		> = {};

		const startDate = new Date(new Date(new Date().getFullYear(), month, 1));
		const endDate = new Date(new Date(new Date().getFullYear(), month, 30));

		let expenses = this.expenseRepository.list({
			dateFrom: startDate.toISOString(),
			dateTo: endDate.toISOString(),
		});

		for (let expense of expenses) {
			let category = expense.category || '—';

			if (!expensesByCategory[category]) {
				expensesByCategory[category] = {
					id: category,
					total: 0,
					percentage: 0,
				};
			}

			expensesByCategory[category].total += this.currencyConverter.convert(
				expense.amount,
				expense.currency,
				currency,
			);
		}

		for (let category in expensesByCategory) {
			total += expensesByCategory[category].total;
		}

		for (let category in expensesByCategory) {
			expensesByCategory[category].percentage =
				(expensesByCategory[category].total / total) * 100;
		}

		let result = Object.values(expensesByCategory);

		return result.sort((a, b) => b.total - a.total);
	}
}
