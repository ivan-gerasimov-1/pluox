import type { TISODateString } from '@pluox/core/src/domain/temporal/types';
import type { Id } from '@pluox/core/src/domain/types';

export type TProductDTO = {
	id: Id;
	createdAt: TISODateString;
	modifiedAt: TISODateString;
};

export type TProductCreateDTO = {};

export type TProductUpdateDTO = {};
