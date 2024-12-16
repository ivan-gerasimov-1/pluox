import { Id } from '@root/core/domain/types';
import { TCategoryDTO } from '@root/core/modules/category/application/dto/categoryDTO';
import { ICategoryFindManyResult } from '@root/core/modules/category/domain/categoryRepository/types';
import type { ICategoryDataSource } from '@root/core/modules/category/infrastructure/categoryDataSource/types';

export class CategoryInMemoryDataSource implements ICategoryDataSource {
	private readonly storage: Map<Id, TCategoryDTO>;

	constructor() {
		this.storage = new Map<Id, TCategoryDTO>();
	}

	save(categoryDto: TCategoryDTO): TCategoryDTO {
		this.storage.set(categoryDto.id, categoryDto);

		return categoryDto;
	}

	findMany(options?: { orderByWeight?: boolean }): ICategoryFindManyResult {
		let categories: TCategoryDTO[] = [];

		for (let category of this.storage.values()) {
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

	findOne(query: unknown): TCategoryDTO | null {
		throw new Error('Not Implemented');
	}

	findById(id: Id): TCategoryDTO | null {
		let category = this.storage.get(id);

		if (!category) {
			return null;
		}

		return category;
	}

	remove(id: Id): Id | null {
		if (!this.storage.has(id)) {
			return null;
		}

		this.storage.delete(id);

		return id;
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
