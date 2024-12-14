import type { TCategoryDTO } from '@root/core/domain/categories/types';
import type { IEntity } from '@root/core/infrastructure/entity/types';

export interface ICategory extends IEntity<TCategoryDTO> {
	increaseWeight(): ICategory;
	decreaseWeight(): ICategory;
}
