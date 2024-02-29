import { Entity } from '@core/infrastructure/entity/Entity';
import { IEntity } from '@core/infrastructure/entity/types';

export type TCategoryDTO = {};

export interface ICategory extends IEntity<TCategoryDTO> {}

export class Category extends Entity<TCategoryDTO> implements ICategory {
	constructor() {
		super();
	}

	public toObject(): TCategoryDTO {
		throw new Error('Not Implemented');
	}
}
