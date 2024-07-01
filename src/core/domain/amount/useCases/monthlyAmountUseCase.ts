import { CurrencyConverter } from '@core/infrastructure/currency/currencyConverter/currencyConverter';
import type { ICurrencyConverter } from '@core/infrastructure/currency/currencyConverter/types';
import type { ECurrency } from '@core/infrastructure/currency/types';
import { getDateParts } from '@domain/amount/useCases/helpers';
import type { TDateParts, TMonth } from '@domain/amount/useCases/types';
import type { IExpenses } from '@domain/expenses/types';

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
		let currentYear = new Date().getFullYear();

		return this.calculateAmount(currency, {
			month: currentMonth,
			year: currentYear,
		});
	}

	private calculateAmount(currency: ECurrency, dateParts: TDateParts): number {
		let expenses = this.#expenses.get();

		let total = 0;

		for (let expense of Object.values(expenses)) {
			/**
			 * @todo remove backward compatibility
			 */
			let expenseDate = expense.date || expense.dateCreated;
			let expenseDateParts = getDateParts(expenseDate);

			if (
				expenseDateParts.month !== dateParts.month ||
				expenseDateParts.year !== dateParts.year
			) {
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
}
