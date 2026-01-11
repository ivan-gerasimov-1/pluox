import type { Id } from '@/core/domain/types';
import type { ICategoryDeleteUseCase } from '@/core/modules/category/application/categoryUseCase/types';
import type { ICategoryRepository } from '@/core/modules/category/domain/categoryRepository/types';

export class CategoryDeleteUseCase implements ICategoryDeleteUseCase {
	constructor(private readonly categoryRepository: ICategoryRepository) {}

	public execute(id: Id): void {
		this.removeById(id);
	}

	public removeById(id: Id): void {
		this.categoryRepository.remove(id);
	}
}
