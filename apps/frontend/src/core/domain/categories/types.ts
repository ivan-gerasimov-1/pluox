import type { ICategory } from '@domain/category/types';
import type { Id } from '@domain/types';

export interface ICategories {
	add(category: ICategory): ICategories;
	remove(category: string): void;
	list(params?: { useWeights?: boolean }): TCategoryDTO[];

	increaseWeight(id: Id): ICategories;
	decreaseWeight(id: Id): ICategories;
}

export type TCategoryCreateDTO = {
	id: Id;
	name: string;
	icon: string;
};

export type TCategoryDTO = {
	id: Id;
	name: string;
	icon: string;
	weight: number;
};
