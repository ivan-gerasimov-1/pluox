import type { TCategoryDTO } from '@root/core/domain/categories/types';

export interface ICategory {
	readonly id: string;

	increaseWeight(): ICategory;
	decreaseWeight(): ICategory;

	toObject(): TCategoryDTO;
}
