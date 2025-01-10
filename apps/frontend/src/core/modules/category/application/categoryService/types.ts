import type { Id } from '@domain/types';
import type { TCategoryDTO } from '@root/core/modules/category/application/dto/categoryDTO';

export interface ICategoryService {
	findAll(params?: { useWeights?: boolean }): TCategoryDTO[];

	/** @deprecated */
	increaseWeight(id: Id): ICategoryService;
	/** @deprecated */
	decreaseWeight(id: Id): ICategoryService;

	getCategoryIcon(categoryId: string | null): string;
	getCategoryName(categoryId: string | null): string;
}
