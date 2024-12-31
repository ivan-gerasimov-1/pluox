import type { ICategory } from '@root/core/modules/category/domain/categoryEntity/types';
import type { Id } from '@root/core/domain/types';
import { Entity } from '@root/core/domain/entity/entity';
import type { TCategoryDTO } from '@root/core/modules/category/application/dto/categoryDTO';
import type { TISODateString } from '@root/core/infrastructure/temporal/types';

export class Category extends Entity<TCategoryDTO> implements ICategory {
	#id: Id;
	#name: string;
	#icon: string;
	#weight: number;

	constructor(
		id: Id,
		name: string,
		icon: string,
		weight: number,
		createdAt: TISODateString,
		modifiedAt?: TISODateString,
	) {
		super(id, createdAt, modifiedAt);

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
		createdAt: TISODateString,
		modifiedAt?: TISODateString,
	): ICategory {
		return new Category(id, name, icon, weight, createdAt, modifiedAt);
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
			createdAt: this.createdAt,
			modifiedAt: this.modifiedAt,
		};
	}
}
