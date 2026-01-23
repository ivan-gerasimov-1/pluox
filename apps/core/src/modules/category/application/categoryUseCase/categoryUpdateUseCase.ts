import type { Id } from '@pluox/core/src/domain/types';

import type { ICategoryUpdateUseCase } from '@pluox/core/src/modules/category/application/categoryUseCase/types';
import type { TCategoryUpdateDTO } from '@pluox/core/src/modules/category/application/dto/categoryDTO';

export class CategoryUpdateUseCase implements ICategoryUpdateUseCase {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public execute(id: Id, categoryUpdateDTO: TCategoryUpdateDTO): void {
		throw new Error('Not Implemented');
	}
}
