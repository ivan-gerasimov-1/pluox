import type { Id } from '@root/core/domain/types';

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
};
