import type { Id } from '@root/core/domain/types';
import type { TISODateString } from '@root/core/domain/temporal/types';

export type TCategoryCreateDTO = {
	id: Id;
	userId: Id;
	name: string;
	icon: string;
} & Partial<Pick<TCategoryDTO, 'weight' | 'createdAt' | 'modifiedAt'>>;

export type TCategoryDTO = {
	id: Id;
	userId: Id;
	name: string;
	icon: string;
	weight: number;
	createdAt: TISODateString;
	modifiedAt: TISODateString;
};

export type TCategoryUpdateDTO = Partial<
	Pick<TCategoryCreateDTO, 'name' | 'icon' | 'weight'>
>;
