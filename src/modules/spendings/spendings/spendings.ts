import type { ISpending, TSpending } from '@modules/spendings/spending/types';
import type {
	ISpendings,
	TSpendings,
} from '@modules/spendings/spendings/types';
import type { Id } from '@modules/types';

export class Spendings implements ISpendings {
	#spendings: Map<Id, TSpending>;

	constructor(spendings: TSpendings) {
		this.#spendings = new Map(Object.entries(spendings));
	}

	public add(spending: ISpending): this {
		this.#spendings.set(spending.id, spending.toObject());

		return this;
	}

	public getAll(): TSpendings {
		return Object.fromEntries(this.#spendings.entries());
	}

	public list(): TSpending[] {
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
