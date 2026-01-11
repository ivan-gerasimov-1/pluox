import type { IEntity } from '@/core/domain/entity/types';
import type { Id } from '@/core/domain/types';

export interface IVenue extends IEntity {
	name: string;
	categoryId: Id;
	isArchived: boolean;
}
