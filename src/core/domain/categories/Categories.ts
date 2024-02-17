import { categoryList } from '@domain/categories/constants';
import type {
	ICategories,
	TCategory,
	TCategoryDTO,
} from '@domain/categories/types';
import type { Id } from '@domain/types';

export class Categories implements ICategories {
	static #instance: ICategories;

	private readonly categories: Map<Id, TCategory>;

	private constructor() {
		this.categories = new Map<Id, TCategory>();
	}

	public static getInstance() {
		if (!this.#instance) {
			this.#instance = new Categories();

			for (const category of categoryList) {
				this.#instance.add(category);
			}
		}

		return this.#instance;
	}

	public add(category: TCategoryDTO): ICategories {
		this.categories.set(category.id, {
			id: category.id,
			name: category.name,
			icon: category.icon,
			weight: 1,
		});

		return this;
	}

	public remove(id: Id) {
		this.categories.delete(id);
	}

	public list(params?: { useWeights?: boolean }): TCategory[] {
		let categoryList = [...this.categories.values()];

		if (params?.useWeights) {
			this.sortByWeight(categoryList);
		}

		return categoryList;
	}

	public increaseWeight(id: Id) {
		let category = this.categories.get(id);

		if (category) {
			category.weight = category.weight + 1;
		}

		return this;
	}

	public decreaseWeight(id: Id) {
		let category = this.categories.get(id);

		if (category) {
			category.weight = category.weight - 1;
		}

		return this;
	}

	/**
	 * @description
	 * Sort categories by weight.
	 * WARNING: this method mutates the original array
	 */
	private sortByWeight(categoryList: TCategory[]): TCategory[] {
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
