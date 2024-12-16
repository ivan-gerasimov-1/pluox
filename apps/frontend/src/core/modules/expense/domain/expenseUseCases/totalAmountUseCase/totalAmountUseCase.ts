import type { ICurrencyConverter } from '@root/core/modules/currency/currencyConverter/types';
import type { ECurrency } from '@root/core/modules/currency/types';

import { getDateParts } from '@root/core/modules/expense/domain/expenseUseCases/totalAmountUseCase/helpers';
import type { TDateParts } from '@root/core/modules/expense/domain/expenseUseCases/totalAmountUseCase/types';
import type { IExpenseRepository } from '@root/core/modules/expense/domain/expenseRepository/types';

export interface ITotalAmountUseCase {
	run(dateParts: Partial<TDateParts>, currency: ECurrency): number;
}

export class TotalAmountUseCase implements ITotalAmountUseCase {
	constructor(
		private readonly expenseRepository: IExpenseRepository,
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
		let expenses = this.expenseRepository.findMany();

		let total = 0;

		for (let expense of expenses.items) {
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
