import type { Id } from '@domain/types';
import type { ICategoryService } from '@root/core/modules/category/application/categoryService/types';
import type { ICategoryRepository } from '@root/core/modules/category/domain/categoryRepository/types';

export class CategoryService implements ICategoryService {
	constructor(private readonly categoryRepository: ICategoryRepository) {}

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

		let category = this.categoryRepository.findById(categoryId);

		if (!category) {
			return categoryId[0].toUpperCase();
		}

		return Reflect.get(category, property);
	}
}
