import { CurrencyConverter } from '@core/infrastructure/currency/currencyConverter/currencyConverter';
import { type ICurrencyConverter } from '@core/infrastructure/currency/currencyConverter/types';
import { type ECurrency } from '@core/infrastructure/currency/types';
import { type IExpenses } from '@domain/expenses/types';
import { InvalidMonthError } from '@domain/expenses/use-cases/errors';
import { monthGuard } from '@domain/expenses/use-cases/typeGuards';
import { type TMonth } from '@domain/expenses/use-cases/types';
import { type TISODateString } from '@domain/types';

export interface IMonthlyAmountUseCase {
	run(currentDate: TISODateString, currency: ECurrency): number;
}

export class MonthlyAmountUseCase implements IMonthlyAmountUseCase {
	readonly #expenses: IExpenses;
	readonly #currencyConverter: ICurrencyConverter;

	private constructor(expenses: IExpenses) {
		this.#expenses = expenses;

		/**
		 * @todo Use DI instead of direct instantiation
		 */
		this.#currencyConverter = CurrencyConverter.getInstance();
	}

	public static create(expenses: IExpenses) {
		return new MonthlyAmountUseCase(expenses);
	}

	public run(currentDate: TISODateString, currency: ECurrency) {
		return this.calculateAmount(currency, currentDate);
	}

	private calculateAmount(
		currency: ECurrency,
		currentDate: TISODateString,
	): number {
		let expenses = this.#expenses.get();
		let currentMonth = this.getMonthFromDate(currentDate);

		let total = 0;

		for (let expense of Object.values(expenses)) {
			let expenseMonth = this.getMonthFromDate(expense.dateCreated);

			if (expenseMonth !== currentMonth) {
				continue;
			}

			let amount = expense.amount;
			let expenseCurrency = expense.currency;

			total += this.#currencyConverter.convert(
				amount,
				expenseCurrency,
				currency,
			);
		}

		return total;
	}

	/**
	 * @throws InvalidMonthError
	 */
	private getMonthFromDate(date: TISODateString): TMonth {
		const month = new Date(date).getMonth();

		if (!monthGuard(month)) {
			throw new InvalidMonthError(month);
		}

		return month;
	}
}
