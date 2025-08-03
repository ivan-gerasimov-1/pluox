import type { TISODateString } from '@root/core/domain/temporal/types';
import type { Id } from '@root/core/domain/types';

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
	name: string;
};
