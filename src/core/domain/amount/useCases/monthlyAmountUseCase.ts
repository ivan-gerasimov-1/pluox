import { CurrencyConverter } from '@core/infrastructure/currency/currencyConverter/currencyConverter';
import { type ICurrencyConverter } from '@core/infrastructure/currency/currencyConverter/types';
import { type ECurrency } from '@core/infrastructure/currency/types';
import { type IExpenses } from '@domain/expenses/types';
import { InvalidMonthError } from '@domain/amount/useCases/errors';
import { monthGuard } from '@domain/amount/useCases/typeGuards';
import { type TMonth } from '@domain/amount/useCases/types';
import { type TISODateString } from '@domain/types';

export interface IMonthlyAmountUseCase {
	run(month: TMonth, currency: ECurrency): number;
}

export class MonthlyAmountUseCase implements IMonthlyAmountUseCase {
	readonly #expenses: IExpenses;
	readonly #currencyConverter: ICurrencyConverter;

	private constructor(
		expenses: IExpenses,
		currencyConverter: ICurrencyConverter,
	) {
		this.#expenses = expenses;
		this.#currencyConverter = currencyConverter;
	}

	public static create(expenses: IExpenses) {
		/**
		 * @todo Use DI instead of direct instantiation
		 */
		let currencyConverter = CurrencyConverter.getInstance();

		return new MonthlyAmountUseCase(expenses, currencyConverter);
	}

	public run(currentMonth: TMonth, currency: ECurrency) {
		return this.calculateAmount(currency, currentMonth);
	}

	private calculateAmount(currency: ECurrency, currentMonth: TMonth): number {
		let expenses = this.#expenses.get();
		let currentYear = new Date().getFullYear();

		let total = 0;

		for (let expense of Object.values(expenses)) {
			/**
			 * @todo remove backward compatibility
			 */
			let expenseDate = expense.date || expense.dateCreated;
			let expenseMonth = this.getMonthFromDate(expenseDate);
			let expenseYear = this.getYearFromDate(expenseDate);

			if (expenseMonth !== currentMonth || expenseYear !== currentYear) {
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

	private getYearFromDate(date: string) {
		const year = new Date(date).getFullYear();

		return year;
	}
}
