import type { ECurrency } from '@root/core/modules/currency/domain/types';
import { Entity } from '@root/core/domain/entity/entity';
import type { IExpense } from '@root/core/modules/expense/domain/expenseEntity/types';
import type { Id, TCategory, TDescription } from '@domain/types';
import type { TExpenseDTO } from '@root/core/modules/expense/application/dto/expenseDTO';
import type { TISODateString } from '@root/core/infrastructure/temporal/types';

export class Expense extends Entity<TExpenseDTO> implements IExpense {
	readonly #amount: number;
	readonly #currency: ECurrency;
	readonly #comment: TDescription;
	readonly #category: TCategory;
	readonly #date: TISODateString;
	readonly #timezone: string;

	private constructor(
		id: Id,
		amount: number,
		currency: ECurrency,
		comment: TDescription,
		category: TCategory,
		timezone: string,
		createdAt: TISODateString,
		modifiedAt?: TISODateString,
		date?: TISODateString,
	) {
		super(id, createdAt, modifiedAt);

		this.#amount = amount;
		this.#currency = currency;
		this.#comment = comment;
		this.#category = category;
		this.#date = date ?? this.createdAt;
		this.#timezone = timezone;
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

	public static create(
		id: Id,
		amount: number,
		currency: ECurrency,
		comment: TDescription,
		category: TCategory = null,
		timezone: string,
		createdAt: TISODateString,
		modifiedAt?: TISODateString,
		date?: TISODateString,
	): IExpense {
		return new Expense(
			id,
			amount,
			currency,
			comment,
			category,
			timezone,
			createdAt,
			modifiedAt,
			date,
		);
	}

	public toDTO(): TExpenseDTO {
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
