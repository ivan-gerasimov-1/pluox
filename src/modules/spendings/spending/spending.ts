import type { ISpending, TSpending } from '@modules/spendings/spending/types';
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

	public toObject(): TSpending {
		return {
			id: this.#id,
			amount: this.#amount,
			dateCreated: this.#dateCreated,
		};
	}
}
