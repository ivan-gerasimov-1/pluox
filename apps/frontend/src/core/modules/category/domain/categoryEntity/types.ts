import type { IEntity } from '@root/core/domain/entity/types';

export interface ICategory extends IEntity {
	name: string;
	icon: string;
	weight: number;

	increaseWeight(): ICategory;
	decreaseWeight(): ICategory;
}
