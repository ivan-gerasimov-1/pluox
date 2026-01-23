import type { IEntity } from '@pluox/core/src/domain/entity/types';
import type { Id } from '@pluox/core/src/domain/types';

export interface IVenue extends IEntity {
	name: string;
	categoryId: Id;
	isArchived: boolean;
}
