import type { TCategoryDTO } from '@root/core/modules/category/application/dto/categoryDTO';

export interface ICategoryService {
	/** @deprecated */
	findAll(params?: { useWeights?: boolean }): TCategoryDTO[];

	getCategoryIcon(categoryId: string | null): string;
	getCategoryName(categoryId: string | null): string;
}
