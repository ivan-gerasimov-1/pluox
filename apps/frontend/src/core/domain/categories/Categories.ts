import type { ICategories, TCategoryDTO } from '@domain/categories/types';
import type { ICategory } from '@root/core/modules/category/types';
import type { Id } from '@domain/types';

export class Categories implements ICategories {
	private readonly categories: Map<Id, ICategory>;

	constructor() {
		this.categories = new Map<Id, ICategory>();
	}

	public add(category: ICategory): ICategories {
		this.categories.set(category.id, category);

		return this;
	}

	public remove(id: Id) {
		this.categories.delete(id);
	}

	public list(params?: { useWeights?: boolean }): TCategoryDTO[] {
		let categoryList: TCategoryDTO[] = [];

		for (let category of this.categories.values()) {
			categoryList.push(category.toObject());
		}

		if (params?.useWeights) {
			this.sortByWeight(categoryList);
		}

		return categoryList;
	}

	public get(id: Id): ICategory {
		let category = this.categories.get(id);

		if (!category) {
			throw new Error('Not Found');
		}

		return category;
	}

	public increaseWeight(id: Id) {
		let category = this.get(id);

		category.increaseWeight();

		return this;
	}

	public decreaseWeight(id: Id) {
		let category = this.get(id);

		category.decreaseWeight();

		return this;
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
