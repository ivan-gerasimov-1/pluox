import type { IExpense, TExpense } from '@domain/expense/types';
import type { IExpenses, TExpenses } from '@domain/expenses/types';
import type { Id } from '@domain/types';

export class Expenses implements IExpenses {
	#expenses: Map<Id, TExpense>;

	constructor(expenses: TExpenses) {
		this.#expenses = new Map(Object.entries(expenses));
	}

	public add(expense: IExpense): this {
		this.#expenses.set(expense.id, expense.toObject());

		return this;
	}

	public getAll(): TExpenses {
		return Object.fromEntries(this.#expenses.entries());
	}

	public list(): TExpense[] {
		return Array.from(this.#expenses.values());
	}

	public getTotalAmount(): number {
		let total = 0;

		for (let [, operation] of this.#expenses) {
			total += operation.amount;
		}

		return total;
	}
}
