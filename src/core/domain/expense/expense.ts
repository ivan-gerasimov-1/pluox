import { type ECurrency } from '@core/infrastructure/currency/types';
import type { IExpense, TExpense } from '@domain/expense/types';
import type { Id, TISODateString } from '@domain/types';
import { generateId } from '@root/utils/id';

export class Expense implements IExpense {
	readonly #id: Id;
	readonly #amount: number;
	readonly #dateCreated: TISODateString;
	readonly #dateModified: TISODateString;
	readonly #currency: ECurrency;
	readonly #comment: string;

	private constructor(amount: number, currency: ECurrency, comment: string) {
		this.#id = generateId();
		this.#amount = amount;
		this.#currency = currency;
		this.#comment = comment;
		this.#dateCreated = new Date().toISOString();
		this.#dateModified = new Date().toISOString();
	}

	public static create(
		amount: number,
		currency: ECurrency,
		comment: string
	): IExpense {
		return new Expense(amount, currency, comment);
	}

	public get id(): Id {
		return this.#id;
	}

	public toObject(): TExpense {
		return {
			id: this.#id,
			amount: this.#amount,
			currency: this.#currency,
			comment: this.#comment,
			dateCreated: this.#dateCreated,
			dateModified: this.#dateModified,
		};
	}
}
