import { Entity } from '@core/domain/entity/entity';
import type { TISODateString } from '@core/domain/temporal/types';
import type { Id } from '@core/domain/types';

import type { ICategory } from '@core/modules/category/domain/categoryEntity/types';

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
		this.#weight += 1;

		this.touch();

		return this;
	}

	public decreaseWeight(): ICategory {
		this.#weight -= 1;

		this.touch();

		return this;
	}
}
