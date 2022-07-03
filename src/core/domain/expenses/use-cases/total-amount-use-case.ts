import { ECurrency } from '@domain/expense/types';
import { CURRENCY_RATE_TO_RUB } from '@domain/expenses/constants';
import { IExpenses } from '@domain/expenses/types';

export interface ITotalAmountUseCase {
	run(currency: ECurrency): number;
}

export class TotalAmountUseCase implements ITotalAmountUseCase {
	readonly #expenses: IExpenses;

	private constructor(expenses: IExpenses) {
		this.#expenses = expenses;
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

			if (expense.currency && expense.currency !== currency) {
				amount = amount * CURRENCY_RATE_TO_RUB[expense.currency];
			}

			total += amount;
		}

		return total;
	}
}
