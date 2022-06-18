import type { IExpense, TExpense } from '@modules/spendings/expense/types';
import type {
	ISpendings,
	TSpendings,
} from '@modules/spendings/spendings/types';
import type { Id } from '@modules/types';

export class Spendings implements ISpendings {
	#spendings: Map<Id, TExpense>;

	constructor(spendings: TSpendings) {
		this.#spendings = new Map(Object.entries(spendings));
	}

	public add(spending: IExpense): this {
		this.#spendings.set(spending.id, spending.toObject());

		return this;
	}

	public getAll(): TSpendings {
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
