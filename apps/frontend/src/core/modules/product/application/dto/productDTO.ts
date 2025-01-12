import type { TISODateString } from '@root/core/domain/temporal/types';
import type { Id } from '@root/core/domain/types';

export type TProductDTO = {
	id: Id;
	createdAt: TISODateString;
	modifiedAt: TISODateString;
};

export type TProductCreateDTO = {};

export type TProductUpdateDTO = {};
