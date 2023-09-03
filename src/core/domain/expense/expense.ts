import { type ECurrency } from '@core/infrastructure/currency/types';
import { Entity } from '@core/infrastructure/entity/Entity';
import type { IExpense, TExpense } from '@domain/expense/types';
import type { TISODateString } from '@domain/types';

export class Expense extends Entity<TExpense> implements IExpense {
	readonly #amount: number;
	readonly #dateCreated: TISODateString;
	readonly #dateModified: TISODateString;
	readonly #currency: ECurrency;
	readonly #comment: string;
	readonly #date: string;

	private constructor(
		amount: number,
		currency: ECurrency,
		comment: string,
		date?: TISODateString,
	) {
		super();

		let currentDate = new Date().toISOString();

		this.#amount = amount;
		this.#currency = currency;
		this.#comment = comment;
		this.#date = date || currentDate;
		this.#dateCreated = currentDate;
		this.#dateModified = currentDate;
	}

	public static create(
		amount: number,
		currency: ECurrency,
		comment: string,
		date?: TISODateString,
	): IExpense {
		return new Expense(amount, currency, comment, date);
	}

	public toObject(): TExpense {
		return {
			id: this.id,
			amount: this.#amount,
			currency: this.#currency,
			comment: this.#comment,
			/**
			 * @todo remove backwards compatibility
			 */
			date: this.#date || this.#dateCreated,
			dateCreated: this.#dateCreated,
			dateModified: this.#dateModified,
		};
	}
}
