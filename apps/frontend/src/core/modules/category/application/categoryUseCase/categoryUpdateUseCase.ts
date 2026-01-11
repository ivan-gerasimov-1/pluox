import type { Id } from '@/core/domain/types';
import type { ICategoryUpdateUseCase } from '@/core/modules/category/application/categoryUseCase/types';
import type { TCategoryUpdateDTO } from '@/core/modules/category/application/dto/categoryDTO';

export class CategoryUpdateUseCase implements ICategoryUpdateUseCase {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public execute(id: Id, categoryUpdateDTO: TCategoryUpdateDTO): void {
		throw new Error('Not Implemented');
	}
}
