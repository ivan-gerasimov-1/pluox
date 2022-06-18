import type { IExpense, TExpense } from '@modules/spendings/expense/types';
import type { IExpenses, TExpenses } from '@modules/spendings/expenses/types';
import type { Id } from '@modules/types';

export class Expenses implements IExpenses {
	#spendings: Map<Id, TExpense>;

	constructor(spendings: TExpenses) {
		this.#spendings = new Map(Object.entries(spendings));
	}

	public add(spending: IExpense): this {
		this.#spendings.set(spending.id, spending.toObject());

		return this;
	}

	public getAll(): TExpenses {
		return Object.fromEntries(this.#spendings.entries());
	}

	public list(): TExpense[] {
		return Array.from(this.#spendings.values());
	}

	public getTotalAmount(): number {
		let total = 0;

		for (let [, operation] of this.#spendings) {
			total += operation.amount;
		}

		return total;
	}
}
