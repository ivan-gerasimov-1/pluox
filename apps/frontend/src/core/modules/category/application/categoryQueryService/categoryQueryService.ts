import type { Id } from '@root/core/domain/types';
import type { ICategoryQueryService } from '@root/core/modules/category/application/categoryQueryService/types';
import type { TCategoryDTO } from '@root/core/modules/category/application/dto/categoryDTO';
import type { ICategoryRepository } from '@root/core/modules/category/domain/categoryRepository/types';
import type { ICategoryMapper } from '@root/core/modules/category/infrastructure/categoryMapper/types';

export class CategoryQueryService implements ICategoryQueryService {
	constructor(
		private readonly categoryRepository: ICategoryRepository,
		private readonly categoryMapper: ICategoryMapper,
	) {}

	public getAll(options?: { useWeights?: boolean }): TCategoryDTO[] {
		let categories = this.categoryRepository.findMany({
			orderByWeight: options?.useWeights,
		});

		return categories.items.map(this.categoryMapper.toDTO);
	}

	public getById(id: Id): TCategoryDTO | null {
		let category = this.categoryRepository.findById(id);

		if (!category) {
			return null;
		}

		return this.categoryMapper.toDTO(category);
	}
}
