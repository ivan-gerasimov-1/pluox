import { CurrencyConverter } from '@core/infrastructure/currency/currencyConverter/currencyConverter';
import type { ICurrencyConverter } from '@core/infrastructure/currency/currencyConverter/types';
import type { ECurrency } from '@core/infrastructure/currency/types';
import { getDateParts } from '@domain/amount/useCases/helpers';
import type { TDateParts, TMonth, TYear } from '@domain/amount/useCases/types';
import type { IExpenses } from '@domain/expenses/types';

export interface IMonthlyAmountUseCase {
	run(dateParts: TDateParts, currency: ECurrency): number;
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

	public run(dateParts: TDateParts, currency: ECurrency) {
		return this.calculateAmount(currency, dateParts);
	}

	private calculateAmount(currency: ECurrency, dateParts: TDateParts): number {
		let expenses = this.#expenses.get();

		let total = 0;

		for (let expense of Object.values(expenses)) {
			let amount = expense.amount;
			let expenseCurrency = expense.currency;
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

			total += this.#currencyConverter.convert(
				amount,
				expenseCurrency,
				currency,
			);
		}

		return total;
	}
}
