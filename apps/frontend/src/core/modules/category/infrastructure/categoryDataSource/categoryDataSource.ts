import {
	TFindManyOptions,
	TFindManyResult,
} from '@root/core/domain/repository/types';
import type { Id } from '@root/core/domain/types';
import type { TCategoryDTO } from '@root/core/modules/category/application/dto/categoryDTO';
import type { ICategoryFindOptions } from '@root/core/modules/category/domain/categoryRepository/types';
import type { ICategoryDataSource } from '@root/core/modules/category/infrastructure/categoryDataSource/types';

export class CategoryInMemoryDataSource implements ICategoryDataSource {
	readonly #storage: Map<Id, TCategoryDTO>;

	constructor() {
		this.#storage = new Map<Id, TCategoryDTO>();
	}

	public upsert(categoryDTO: TCategoryDTO): void {
		if (this.#storage.has(categoryDTO.id)) {
			this.update(categoryDTO);
		} else {
			this.insert(categoryDTO);
		}
	}

	public insert(categoryDTO: TCategoryDTO): TCategoryDTO {
		this.#storage.set(categoryDTO.id, categoryDTO);

		return categoryDTO;
	}

	public update(categoryDTO: { id: Id } & Partial<TCategoryDTO>): TCategoryDTO {
		let category = this.#storage.get(categoryDTO.id);

		if (!category) {
			throw new Error(`Category with id ${categoryDTO.id} not found`);
		}

		this.#storage.set(categoryDTO.id, {
			...category,
			...categoryDTO,
		});

		return this.#storage.get(categoryDTO.id) as TCategoryDTO;
	}

	public drop(): void {
		this.#storage.clear();
	}

	public findOne(query?: { id?: Id }): TCategoryDTO | null {
		if (query?.id) {
			return this.findById(query.id);
		}

		return null;
	}

	public findMany(
		options?: TFindManyOptions<ICategoryFindOptions>,
	): TFindManyResult<TCategoryDTO> {
		let categories: TCategoryDTO[] = [];

		for (let category of this.#storage.values()) {
			categories.push(category);
		}

		if (options?.orderByWeight) {
			this.sortByWeight(categories);
		}

		return {
			items: categories,
			total: categories.length,
		};
	}

	private findById(id: Id): TCategoryDTO | null {
		let category = this.#storage.get(id);

		if (!category) {
			return null;
		}

		return category;
	}

	public remove(id: Id): TCategoryDTO | null {
		let category = this.#storage.get(id);

		if (!category) {
			return null;
		}

		this.#storage.delete(id);

		return category;
	}

	/**
	 * @description
	 * Sort categories by weight.
	 * WARNING: this method mutates the original array
	 */
	private sortByWeight(categoryList: TCategoryDTO[]): TCategoryDTO[] {
		return categoryList.sort((aCategory, bCategory) => {
			if (aCategory.weight > bCategory.weight) {
				return -1;
			}

			if (aCategory.weight < bCategory.weight) {
				return 1;
			}

			return 0;
		});
	}
}
