import type { ECurrency } from '@core/infrastructure/currency/types';
import { Entity } from '@core/infrastructure/entity/Entity';
import type { IExpense, TExpense } from '@domain/expense/types';
import type { TCategory, TISODateString } from '@domain/types';

export class Expense extends Entity<TExpense> implements IExpense {
	readonly #amount: number;
	readonly #currency: ECurrency;
	readonly #comment: string;
	readonly #category: TCategory;
	readonly #date: string;
	readonly #timezone: string;

	private constructor(
		amount: number,
		currency: ECurrency,
		comment: string,
		category: TCategory,
		timezone: string,
		date?: TISODateString,
	) {
		super();

		this.#amount = amount;
		this.#currency = currency;
		this.#comment = comment;
		this.#category = category;
		this.#date = date || this.dateCreated;
		this.#timezone = timezone;
	}

	public static create(
		amount: number,
		currency: ECurrency,
		comment: string,
		category: TCategory = null,
		timezone: string,
		date?: TISODateString,
	): IExpense {
		return new Expense(amount, currency, comment, category, timezone, date);
	}

	public toObject(): TExpense {
		return {
			id: this.id,
			amount: this.#amount,
			currency: this.#currency,
			comment: this.#comment,
			category: this.#category,
			/**
			 * @todo remove backwards compatibility
			 */
			date: this.#date || this.dateCreated,
			dateCreated: this.dateCreated,
			dateModified: this.dateModified,
			timezone: this.#timezone,
		};
	}
}
