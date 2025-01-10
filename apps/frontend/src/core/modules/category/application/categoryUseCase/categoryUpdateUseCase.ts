import type { Id } from '@root/core/domain/types';
import type { ICategoryUpdateUseCase } from '@root/core/modules/category/application/categoryUseCase/types';
import type { TCategoryUpdateDTO } from '@root/core/modules/category/application/dto/categoryDTO';

export class CategoryUpdateUseCase implements ICategoryUpdateUseCase {
	constructor() {}

	public execute(id: Id, categoryUpdateDTO: TCategoryUpdateDTO): void {
		throw new Error('Not Implemented');
	}
}
