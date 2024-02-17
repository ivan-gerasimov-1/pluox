import type { Id } from '@domain/types';

export interface ICategories {
	add(category: TCategoryDTO): ICategories;
	remove(category: string): void;
	list(params?: { useWeights?: boolean }): TCategory[];

	increaseWeight(id: Id): ICategories;
	decreaseWeight(id: Id): ICategories;
}

export type TCategoryDTO = {
	id: Id;
	name: string;
	icon: string;
};

export type TCategory = {
	id: Id;
	name: string;
	icon: string;
	weight: number;
};
