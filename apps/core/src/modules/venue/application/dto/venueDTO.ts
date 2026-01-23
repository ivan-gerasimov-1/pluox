import type { TISODateString } from '@pluox/core/src/domain/temporal/types';
import type { Id } from '@pluox/core/src/domain/types';

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
