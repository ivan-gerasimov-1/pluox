import type { IEntity } from '@root/core/domain/entity/types';
import type { Id } from '@root/core/domain/types';

export interface IVenue extends IEntity {
	name: string;
	categoryId: Id;
	isArchived: boolean;
}
