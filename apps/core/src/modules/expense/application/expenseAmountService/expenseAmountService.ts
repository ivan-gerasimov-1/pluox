import type { Id, TCategory } from '@core/domain/types';

import type { ICurrencyRateService } from '@core/modules/currency/application/currencyRateService/types';
import type { TExpenseDTO } from '@core/modules/expense/application/dto/expenseDTO';
import type {
	IExpenseAmountService,
	TAmountByCategory,
} from '@core/modules/expense/application/expenseAmountService/types';
import type { IAppConfig } from '@core/modules/settings/domain/appConfig/types';

export class ExpenseAmountService implements IExpenseAmountService {
	constructor(
		private readonly appConfig: IAppConfig,
		private readonly currencyRatesService: ICurrencyRateService,
	) {}

	public calculateAmount(expenses: TExpenseDTO[]): number {
		let totalAmount = 0;
		let currency = this.appConfig.currency;

		for (let expense of expenses) {
			totalAmount += this.currencyRatesService.convert(
				expense.amount,
				expense.currency,
				currency,
			);
		}

		return totalAmount;
	}

	public calculateAmountByCategory(
		expenses: TExpenseDTO[],
	): TAmountByCategory[] {
		let currency = this.appConfig.currency;

		let totalAmount = 0;
		let expensesByCategory: Record<Id, TAmountByCategory> = {};

		for (let expense of expenses) {
			let category = expense.category || '—';

			if (!expensesByCategory[category]) {
				expensesByCategory[category] = this.createEmptyCategory(category);
			}

			let expenseAmount = this.currencyRatesService.convert(
				expense.amount,
				expense.currency,
				currency,
			);

			expensesByCategory[category].total += expenseAmount;
			totalAmount += expenseAmount;
		}

		for (let category of Object.keys(expensesByCategory)) {
			expensesByCategory[category].percentage =
				(expensesByCategory[category].total / totalAmount) * 100;
		}

		// prettier-ignore
		return Object //
			.values(expensesByCategory)
			.sort((firstValue, secondValue) => secondValue.total - firstValue.total);
	}

	private createEmptyCategory(categoryId: TCategory = '—'): TAmountByCategory {
		return {
			id: categoryId,
			total: 0,
			percentage: 0,
		};
	}
}
