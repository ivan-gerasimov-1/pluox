import type { Id } from '@domain/types';
import { CategoryNotFoundError } from '@root/core/modules/category/application/categoryService/errors';
import type { ICategoryService } from '@root/core/modules/category/application/categoryService/types';
import type { TCategoryDTO } from '@root/core/modules/category/application/dto/categoryDTO';
import type { ICategory } from '@root/core/modules/category/domain/categoryEntity/types';
import type { ICategoryRepository } from '@root/core/modules/category/domain/categoryRepository/types';
import type { ICategoryMapper } from '@root/core/modules/category/infrastructure/categoryMapper/types';

export class CategoryService implements ICategoryService {
	constructor(
		private readonly categoryRepository: ICategoryRepository,
		private readonly categoryMapper: ICategoryMapper,
	) {}

	/** @deprecated */
	public findAll(params?: { useWeights?: boolean }): TCategoryDTO[] {
		let result = this.categoryRepository.findMany({
			orderByWeight: params?.useWeights,
		});

		return result.items;
	}

	/** @deprecated */
	public findById(id: Id): ICategory {
		let category = this.categoryRepository.findById(id);

		if (!category) {
			throw new CategoryNotFoundError(id);
		}

		return this.categoryMapper.toEntity(category);
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

		let categoryDTO = this.categoryMapper.toDTO(category);

		return Reflect.get(categoryDTO, property);
	}
}
