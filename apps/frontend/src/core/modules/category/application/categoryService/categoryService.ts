import type { ICategoryService } from '@root/core/modules/category/application/categoryService/types';
import type { TCategoryDTO } from '@root/core/modules/category/application/dto/categoryDTO';
import type { ICategory } from '@root/core/modules/category/domain/categoryEntity/types';
import type { Id } from '@domain/types';

export class CategoryService implements ICategoryService {
	private readonly categories: Map<Id, ICategory>;

	constructor() {
		this.categories = new Map<Id, ICategory>();
	}

	public add(category: ICategory): ICategoryService {
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

	public getCategoryIcon(categoryId: string | null): string {
		return this.getCategoryProperty(categoryId, 'icon', '?');
	}

	public getCategoryName(categoryId: string | null): string {
		return this.getCategoryProperty(categoryId, 'name', '—');
	}

	private getCategoryProperty(
		categoryId: string | null,
		property: 'name' | 'icon',
		defaultValue: string,
	): string {
		if (!categoryId || categoryId === '—') {
			return defaultValue;
		}

		let category = this.get(categoryId);

		if (!category) {
			return categoryId[0].toUpperCase();
		}

		let categoryDTO = category.toObject();

		return Reflect.get(categoryDTO, property);
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
