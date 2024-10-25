import type { ECurrency } from '@core/infrastructure/currency/types';
import { Entity } from '@core/infrastructure/entity/Entity';
import type { IExpense, TExpense } from '@domain/expense/types';
import type { TCategory, TComment, TISODateString } from '@domain/types';

export class Expense extends Entity<TExpense> implements IExpense {
	readonly #amount: number;
	readonly #currency: ECurrency;
	readonly #comment: TComment;
	readonly #category: TCategory;
	readonly #date: TISODateString;
	readonly #timezone: string;

	private constructor(
		amount: number,
		currency: ECurrency,
		comment: TComment,
		category: TCategory,
		timezone: string,
		date?: TISODateString,
	) {
		super();

		this.#amount = amount;
		this.#currency = currency;
		this.#comment = comment;
		this.#category = category;
		this.#date = date || this.createdAt;
		this.#timezone = timezone;
	}

	public static create(
		amount: number,
		currency: ECurrency,
		comment: TComment,
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
			date: this.#date,
			createdAt: this.createdAt,
			modifiedAt: this.modifiedAt,
			timezone: this.#timezone,
		};
	}
}
