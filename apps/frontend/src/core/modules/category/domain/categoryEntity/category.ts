import type { ICategory } from '@root/core/modules/category/domain/categoryEntity/types';
import type { Id } from '@root/core/domain/types';
import { Entity } from '@root/core/domain/entity/entity';
import type { TISODateString } from '@root/core/domain/temporal/types';

export class Category extends Entity implements ICategory {
	#userId: Id;
	#name: string;
	#icon: string;
	#weight: number;

	constructor(
		id: Id,
		userId: Id,
		name: string,
		icon: string,
		weight: number,
		createdAt: TISODateString,
		modifiedAt?: TISODateString,
	) {
		super(id, createdAt, modifiedAt);

		this.#userId = userId;
		this.#name = name;
		this.#icon = icon;
		this.#weight = weight;
	}

	public static create(
		id: Id,
		userId: Id,
		name: string,
		icon: string,
		weight: number,
		createdAt: TISODateString,
		modifiedAt?: TISODateString,
	): ICategory {
		return new Category(id, userId, name, icon, weight, createdAt, modifiedAt);
	}

	public get userId(): string {
		return this.#userId;
	}

	public get name(): string {
		return this.#name;
	}

	public get icon(): string {
		return this.#icon;
	}

	public get weight(): number {
		return this.#weight;
	}

	public increaseWeight(): ICategory {
		this.#weight++;

		return this;
	}

	public decreaseWeight(): ICategory {
		this.#weight--;

		return this;
	}
}
