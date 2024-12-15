import type { ICategory } from '@root/core/modules/category/domain/categoryEntity/types';
import type { Id } from '@domain/types';
import type { TCategoryDTO } from '@root/core/modules/category/application/dto/categoryDTO';

export interface ICategoryService {
	add(category: ICategory): ICategoryService;
	remove(category: string): void;
	list(params?: { useWeights?: boolean }): TCategoryDTO[];

	increaseWeight(id: Id): ICategoryService;
	decreaseWeight(id: Id): ICategoryService;

	getCategoryIcon(categoryId: string | null): string;
	getCategoryName(categoryId: string | null): string;
}
