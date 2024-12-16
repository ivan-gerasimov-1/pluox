import type { Id } from '@root/core/domain/types';
import type { TISODateString } from '@root/core/infrastructure/temporal/types';

export type TCategoryCreateDTO = {
	id: Id;
	name: string;
	icon: string;
};

export type TCategoryDTO = {
	id: Id;
	name: string;
	icon: string;
	weight: number;
	createdAt: TISODateString;
	modifiedAt: TISODateString;
};
