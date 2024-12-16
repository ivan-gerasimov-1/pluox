import type { ICategoryService } from '@root/core/modules/category/application/categoryService/types';
import type { TCategoryDTO } from '@root/core/modules/category/application/dto/categoryDTO';
import type { ICategory } from '@root/core/modules/category/domain/categoryEntity/types';
import type { Id } from '@domain/types';
import type { ICategoryRepository } from '@root/core/modules/category/domain/categoryRepository/types';
import { Category } from '@root/core/modules/category/domain/categoryEntity/category';
import { CategoryNotFoundError } from '@root/core/modules/category/application/categoryService/errors';

export class CategoryService implements ICategoryService {
	constructor(private readonly categoryRepository: ICategoryRepository) {}

	public create(category: ICategory): ICategoryService {
		this.categoryRepository.create(category);

		return this;
	}

	public findAll(params?: { useWeights?: boolean }): TCategoryDTO[] {
		let result = this.categoryRepository.findMany({
			orderByWeight: params?.useWeights,
		});

		return result.items;
	}

	public findById(id: Id): ICategory {
		let category = this.categoryRepository.findById(id);

		if (!category) {
			throw new CategoryNotFoundError(id);
		}

		return Category.create(
			category.id,
			category.name,
			category.icon,
			category.weight,
			category.createdAt,
			category.modifiedAt,
		);
	}

	public remove(id: Id): ICategoryService {
		this.categoryRepository.remove(id);

		return this;
	}

	public increaseWeight(id: Id) {
		let category = this.findById(id);

		category.increaseWeight();

		this.categoryRepository.update(category);

		return this;
	}

	public decreaseWeight(id: Id) {
		let category = this.findById(id);

		category.decreaseWeight();

		this.categoryRepository.update(category);

		return this;
	}

	public getCategoryIcon(categoryId: Id | null): string {
		return this.getCategoryProperty(categoryId, 'icon', '?');
	}

	public getCategoryName(categoryId: Id | null): string {
		return this.getCategoryProperty(categoryId, 'name', '—');
	}

	private getCategoryProperty(
		categoryId: Id | null,
		property: 'name' | 'icon',
		defaultValue: string,
	): string {
		if (!categoryId || categoryId === '—') {
			return defaultValue;
		}

		let category = this.findById(categoryId);

		if (!category) {
			return categoryId[0].toUpperCase();
		}

		let categoryDTO = category.toObject();

		return Reflect.get(categoryDTO, property);
	}
}
