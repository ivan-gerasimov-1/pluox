import type { ICurrencyConverter } from '@core/infrastructure/currency/currencyConverter/types';
import type { ECurrency } from '@core/infrastructure/currency/types';

import { getDateParts } from '@domain/amount/useCases/helpers';
import type { TDateParts } from '@domain/amount/useCases/types';
import type { IExpenses } from '@domain/expenses/types';

export interface ITotalAmountUseCase {
	run(dateParts: Partial<TDateParts>, currency: ECurrency): number;
}

export class TotalAmountUseCase implements ITotalAmountUseCase {
	constructor(
		private readonly expenses: IExpenses,
		private readonly currencyConverter: ICurrencyConverter,
	) {}

	public run(dateParts: TDateParts, currency: ECurrency) {
		return this.calculateAmount(currency, dateParts);
	}

	private calculateAmount(
		currency: ECurrency,
		dateParts: Partial<TDateParts>,
	): number {
		/**
		 * @todo
		 * 1. Add query to get()
		 * 2. Query only related expenses
		 * 3. Remove filtering from calculation logic
		 */
		let expenses = this.expenses.get();

		let total = 0;

		for (let expense of Object.values(expenses)) {
			let amount = expense.amount;
			let expenseCurrency = expense.currency;
			let expenseDateParts = getDateParts(expense.date);

			if (
				(dateParts.month !== undefined &&
					expenseDateParts.month !== dateParts.month) ||
				(dateParts.year !== undefined &&
					expenseDateParts.year !== dateParts.year)
			) {
				continue;
			}

			total += this.currencyConverter.convert(
				amount,
				expenseCurrency,
				currency,
			);
		}

		return total;
	}
}
