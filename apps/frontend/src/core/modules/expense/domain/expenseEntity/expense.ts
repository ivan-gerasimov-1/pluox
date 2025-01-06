import type { ECurrency } from '@root/core/modules/currency/domain/types';
import { Entity } from '@root/core/domain/entity/entity';
import type { IExpense } from '@root/core/modules/expense/domain/expenseEntity/types';
import type { Id, TCategory, TDescription } from '@domain/types';
import type { TISODateString } from '@root/core/domain/temporal/types';

export class Expense extends Entity implements IExpense {
	readonly #userId: Id;
	readonly #amount: number;
	readonly #currency: ECurrency;
	readonly #description: TDescription;
	readonly #category: TCategory;
	readonly #date: TISODateString;
	readonly #timezone: string;

	private constructor(
		id: Id,
		userId: Id,
		amount: number,
		currency: ECurrency,
		description: TDescription,
		category: TCategory,
		timezone: string,
		createdAt: TISODateString,
		modifiedAt?: TISODateString,
		date?: TISODateString,
	) {
		super(id, createdAt, modifiedAt);

		this.#userId = userId;
		this.#amount = amount;
		this.#currency = currency;
		this.#description = description;
		this.#category = category;
		this.#date = date ?? this.createdAt;
		this.#timezone = timezone;
	}

	public get userId(): Id {
		return this.#userId;
	}

	public get amount(): number {
		return this.#amount;
	}

	public get currency(): ECurrency {
		return this.#currency;
	}

	public get category(): TCategory {
		return this.#category;
	}

	public get date(): TISODateString {
		return this.#date;
	}

	public get description(): TDescription {
		return this.#description;
	}

	public get timezone(): string {
		return this.#timezone;
	}

	public static create(
		id: Id,
		userId: Id,
		amount: number,
		currency: ECurrency,
		description: TDescription,
		category: TCategory = null,
		timezone: string,
		createdAt: TISODateString,
		modifiedAt?: TISODateString,
		date?: TISODateString,
	): IExpense {
		return new Expense(
			id,
			userId,
			amount,
			currency,
			description,
			category,
			timezone,
			createdAt,
			modifiedAt,
			date,
		);
	}
}
