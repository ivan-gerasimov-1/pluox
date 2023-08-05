import { CurrencyConverter } from '@core/infrastructure/currency/currencyConverter/currencyConverter';
import { type ICurrencyConverter } from '@core/infrastructure/currency/currencyConverter/types';
import { ECurrency } from '@domain/expense/types';
import { type IExpenses } from '@domain/expenses/types';

export interface ITotalAmountUseCase {
	run(currency: ECurrency): number;
}

export class TotalAmountUseCase implements ITotalAmountUseCase {
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
		return new TotalAmountUseCase(expenses);
	}

	public run(currency: ECurrency) {
		return this.calculateAmount(currency);
	}

	private calculateAmount(currency: ECurrency): number {
		const expenses = this.#expenses.get();

		let total = 0;

		for (let expense of Object.values(expenses)) {
			let amount = expense.amount;
			let expenseCurrency = expense.currency;

			total += this.#currencyConverter.convert(
				amount,
				expenseCurrency,
				currency
			);
		}

		return total;
	}
}
