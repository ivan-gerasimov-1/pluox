import type { IEntity } from '@core/infrastructure/entity/types';
import type { TCategoryDTO } from '@domain/categories/types';

export interface ICategory extends IEntity<TCategoryDTO> {
	increaseWeight(): ICategory;
	decreaseWeight(): ICategory;
}
