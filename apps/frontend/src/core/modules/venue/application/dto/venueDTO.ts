import type { TISODateString } from '@root/core/domain/temporal/types';
import type { Id } from '@root/core/domain/types';

export type TVenueDTO = {
	id: Id;
	name: string;
	categoryId: Id;
	createdAt: TISODateString;
	modifiedAt: TISODateString;
};

export type TVenueCreateDTO = {};

export type TVenueUpdateDTO = {};
