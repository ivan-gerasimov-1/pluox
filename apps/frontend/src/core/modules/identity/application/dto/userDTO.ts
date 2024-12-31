import type { Id } from '@root/core/domain/types';
import type { TISODateString } from '@root/core/infrastructure/temporal/types';

export type TUserDTO = {
	id: string;
	email: string;
	password: string;
	createdAt: TISODateString;
	modifiedAt: TISODateString;
};

export type TUserCreateDTO = {
	id: Id;
	email: string;
	password: string;
	createdAt: TISODateString;
	modifiedAt?: TISODateString;
};
