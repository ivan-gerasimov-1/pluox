import type { IEntity } from '@pluox/core/src/domain/entity/types';
import type { Id } from '@pluox/core/src/domain/types';

export interface ICategory extends IEntity {
	userId: Id;
	name: string;
	icon: string;
	weight: number;

	increaseWeight(): ICategory;
	decreaseWeight(): ICategory;
}
