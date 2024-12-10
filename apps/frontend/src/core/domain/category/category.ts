import type { TCategoryDTO } from '@domain/categories/types';
import type { ICategory } from '@domain/category/types';
import type { Id } from '@root/core/domain/types';

/**
 * @todo Extend from ValueObject
 */
export class Category implements ICategory {
	#id: Id;
	#name: string;
	#icon: string;
	#weight: number;

	private constructor(id: Id, name: string, icon: string, weight: number) {
		this.#id = id;
		this.#name = name;
		this.#icon = icon;
		this.#weight = weight;
	}

	public static create(
		id: Id,
		name: string,
		icon: string,
		weight: number,
	): ICategory {
		return new Category(id, name, icon, weight);
	}

	public get id(): string {
		return this.#id;
	}

	public increaseWeight(): ICategory {
		this.#weight++;

		return this;
	}

	public decreaseWeight(): ICategory {
		this.#weight--;

		return this;
	}

	public toObject(): TCategoryDTO {
		return {
			id: this.id,
			name: this.#name,
			icon: this.#icon,
			weight: this.#weight,
		};
	}
}
