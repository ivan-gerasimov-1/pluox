import type { TCategoryDTO } from '@root/core/modules/category/application/dto/categoryDTO';
import type { IEntity } from '@root/core/infrastructure/entity/types';

export interface ICategory extends IEntity<TCategoryDTO> {
	increaseWeight(): ICategory;
	decreaseWeight(): ICategory;
}
