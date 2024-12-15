import type { ICategory } from '@root/core/modules/category/domain/categoryEntity/types';
import type { Id } from '@domain/types';
import type { TCategoryDTO } from '@root/core/modules/category/application/dto/categoryDTO';

export interface ICategories {
	add(category: ICategory): ICategories;
	remove(category: string): void;
	list(params?: { useWeights?: boolean }): TCategoryDTO[];

	increaseWeight(id: Id): ICategories;
	decreaseWeight(id: Id): ICategories;
}
