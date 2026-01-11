import type { IEntity } from '@/core/domain/entity/types';
import type { Id } from '@/core/domain/types';

export interface ICategory extends IEntity {
	userId: Id;
	name: string;
	icon: string;
	weight: number;

	increaseWeight(): ICategory;
	decreaseWeight(): ICategory;
}
