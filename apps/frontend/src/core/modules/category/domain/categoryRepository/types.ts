import type { Id } from '@root/core/domain/types';
import type { ICategory } from '@root/core/modules/category/domain/categoryEntity/types';
import type { TCategoryDTO } from '@root/core/modules/category/application/dto/categoryDTO';

export interface ICategoryRepository {
	create(category: ICategory): TCategoryDTO;
	update(category: ICategory): TCategoryDTO;

	findMany(options?: { orderByWeight?: boolean }): ICategoryFindManyResult;
	/** @todo Not Implemented */
	findOne(query: unknown): TCategoryDTO;
	/**
	 * @throws {CategoryNotFoundError}
	 */
	findById(id: Id): TCategoryDTO;

	/**
	 * @throws {CategoryNotFoundError}
	 */
	remove(id: Id): void;
}

export interface ICategoryFindManyResult {
	items: TCategoryDTO[];
	total: number;
}
