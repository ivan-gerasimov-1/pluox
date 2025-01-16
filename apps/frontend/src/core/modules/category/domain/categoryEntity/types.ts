import type { IEntity } from '@root/core/domain/entity/types';
import type { Id } from '@root/core/domain/types';

export interface ICategory extends IEntity {
	userId: Id;
	name: string;
	icon: string;
	weight: number;

	increaseWeight(): ICategory;
	decreaseWeight(): ICategory;
}
