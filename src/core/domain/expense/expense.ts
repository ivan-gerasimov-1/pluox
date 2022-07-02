import { ECurrency, IExpense, TExpense } from '@domain/expense/types';
import type { Id, TISODateString } from '@domain/types';
import { generateId } from '@root/utils/id';

export class Expense implements IExpense {
	#id: Id;
	#amount: number;
	#dateCreated: TISODateString;
	#currency: ECurrency;

	private constructor(amount: number, currency: ECurrency) {
		this.#id = generateId();
		this.#amount = amount;
		this.#currency = currency;
		this.#dateCreated = new Date().toISOString();
	}

	public static create(amount: number): IExpense {
		return new Expense(amount, ECurrency.RUB);
	}

	public get id(): Id {
		return this.#id;
	}

	public toObject(): TExpense {
		return {
			id: this.#id,
			amount: this.#amount,
			currency: this.#currency,
			dateCreated: this.#dateCreated,
		};
	}
}
