import { CurrencyConverter } from '@domain/currency/currency-converter/currency-converter';
import { type ICurrencyConverter } from '@domain/currency/currency-converter/types';
import { ECurrency } from '@domain/expense/types';
import { type IExpenses } from '@domain/expenses/types';

export interface IMonthlyAmountUseCase {
	run(currency: ECurrency): number;
}

export class MonthlyAmountUseCase implements IMonthlyAmountUseCase {
	readonly #expenses: IExpenses;
	readonly #currencyConverter: ICurrencyConverter;

	private constructor(expenses: IExpenses) {
		this.#expenses = expenses;

		/**
		 * @todo Use DI instead of direct instantiation
		 */
		this.#currencyConverter = CurrencyConverter.create();
	}

	public static create(expenses: IExpenses) {
		return new MonthlyAmountUseCase(expenses);
	}

	public run(currency: ECurrency = ECurrency.RUB) {
		return this.calculateAmount(currency);
	}

	private calculateAmount(currency: ECurrency): number {
		let expenses = this.#expenses.get();
		let currentMonth = new Date().getMonth();

		let total = 0;

		for (let expense of Object.values(expenses)) {
			let expenseMonth = new Date(expense.dateCreated).getMonth();

			if (expenseMonth !== currentMonth) {
				continue;
			}

			let amount = expense.amount;
			let expenseCurrency = expense.currency || ECurrency.RUB;

			total += this.#currencyConverter.convert(
				amount,
				expenseCurrency,
				currency
			);
		}

		return total;
	}
}
