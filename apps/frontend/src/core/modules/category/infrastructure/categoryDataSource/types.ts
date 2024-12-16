import type { Id } from '@root/core/domain/types';
import type { TCategoryDTO } from '@root/core/modules/category/application/dto/categoryDTO';
import type { ICategoryFindManyResult } from '@root/core/modules/category/domain/categoryRepository/types';

export interface ICategoryDataSource {
	save(category: TCategoryDTO): TCategoryDTO;

	findMany(options?: { orderByWeight?: boolean }): ICategoryFindManyResult;
	/** @todo Not Implemented */
	findOne(query: unknown): TCategoryDTO | null;
	findById(id: Id): TCategoryDTO | null;

	remove(id: Id): Id | null;
}
