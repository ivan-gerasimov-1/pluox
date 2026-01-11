import type { TISODateString } from '@/core/domain/temporal/types';
import type { Id } from '@/core/domain/types';

export type TProductDTO = {
	id: Id;
	createdAt: TISODateString;
	modifiedAt: TISODateString;
};

export type TProductCreateDTO = {};

export type TProductUpdateDTO = {};
