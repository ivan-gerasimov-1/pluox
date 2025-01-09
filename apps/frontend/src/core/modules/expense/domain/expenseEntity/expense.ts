import type { ECurrency } from '@root/core/modules/currency/domain/types';
import { Entity } from '@root/core/domain/entity/entity';
import type { IExpense } from '@root/core/modules/expense/domain/expenseEntity/types';
import type { Id, TCategory, TDescription } from '@domain/types';
import type { TISODateString } from '@root/core/domain/temporal/types';

export class Expense extends Entity implements IExpense {
	#userId: Id;
	#amount: number;
	#currency: ECurrency;
	#description: TDescription;
	#category: TCategory;
	#date: TISODateString;
	#timezone: string;

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

	public set amount(amount: number) {
		this.#amount = amount;

		this.touch();
	}

	public get currency(): ECurrency {
		return this.#currency;
	}

	public set currency(currency: ECurrency) {
		this.#currency = currency;

		this.touch();
	}

	public get category(): TCategory {
		return this.#category;
	}

	public set category(category: TCategory) {
		this.#category = category;

		this.touch();
	}

	public get date(): TISODateString {
		return this.#date;
	}

	public set date(date: TISODateString) {
		this.#date = date;

		this.touch();
	}

	public get description(): TDescription {
		return this.#description;
	}

	public set description(description: TDescription) {
		this.#description = description;

		this.touch();
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
