import { Entity } from '@pluox/core/src/domain/entity/entity';
import type { TISODateString } from '@pluox/core/src/domain/temporal/types';
import type { Id, TCategory, TDescription } from '@pluox/core/src/domain/types';

import type { TCurrency } from '@pluox/core/src/modules/currency/domain/types';
import type { IExpense } from '@pluox/core/src/modules/expense/domain/expenseEntity/types';

export class Expense extends Entity implements IExpense {
	#userId: Id;
	#amount: number;
	#currency: TCurrency;
	#description: TDescription;
	#category: TCategory | null;
	#venue: Id | null;
	#date: TISODateString;
	#timezone: string;

	constructor(
		id: Id,
		userId: Id,
		amount: number,
		currency: TCurrency,
		description: TDescription,
		category: TCategory | null,
		venue: Id | null,
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
		this.#venue = venue;
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

	public get currency(): TCurrency {
		return this.#currency;
	}

	public set currency(currency: TCurrency) {
		this.#currency = currency;

		this.touch();
	}

	public get category(): TCategory | null {
		return this.#category;
	}

	public set category(category: TCategory) {
		this.#category = category;

		this.touch();
	}

	public get venue(): Id | null {
		return this.#venue;
	}

	public set venue(venueId: Id) {
		this.#venue = venueId;

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
}
