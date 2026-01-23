import type { TISODateString } from '@pluox/core/src/domain/temporal/types';
import type { Id } from '@pluox/core/src/domain/types';

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
