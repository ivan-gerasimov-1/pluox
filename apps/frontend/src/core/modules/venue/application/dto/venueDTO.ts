import type { TISODateString } from '@/core/domain/temporal/types';
import type { Id } from '@/core/domain/types';

export type TVenueDTO = {
	id: Id;
	name: string;
	categoryId: Id;
	isArchived: boolean;
	createdAt: TISODateString;
	modifiedAt: TISODateString;
};

export type TVenueCreateDTO = {
	name: string;
	categoryId: Id;
	isArchived: boolean;
};

export type TVenueUpdateDTO = {
	name?: string;
	categoryId?: Id;
};
