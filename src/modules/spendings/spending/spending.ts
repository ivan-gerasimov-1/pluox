import type { ISpending } from '@modules/spendings/spending/types';
import type { TSpendingOperation } from '@modules/spendings/spendings.store';
import type { Id, TISODateString } from '@modules/types';
import { generateId } from '@root/utils/id';

export class Spending implements ISpending {
	#id: Id;
	#amount: number;
	#dateCreated: TISODateString;

	constructor(amount: number) {
		this.#id = generateId();
		this.#amount = amount;
		this.#dateCreated = new Date().toISOString();
	}

	public get id(): Id {
		return this.#id;
	}

	public toObject(): TSpendingOperation {
		return {
			id: this.#id,
			amount: this.#amount,
			dateCreated: this.#dateCreated,
		};
	}
}
