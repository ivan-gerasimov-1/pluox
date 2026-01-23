import type { Id } from '@pluox/core/src/domain/types';

import type { ICategoryDeleteUseCase } from '@pluox/core/src/modules/category/application/categoryUseCase/types';
import type { ICategoryRepository } from '@pluox/core/src/modules/category/domain/categoryRepository/types';

export class CategoryDeleteUseCase implements ICategoryDeleteUseCase {
	constructor(private readonly categoryRepository: ICategoryRepository) {}

	public execute(id: Id): void {
		this.removeById(id);
	}

	public removeById(id: Id): void {
		this.categoryRepository.remove(id);
	}
}
