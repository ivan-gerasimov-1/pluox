import type { Id } from '@root/core/domain/types';
import type { TISODateString } from '@root/core/infrastructure/temporal/types';

export type TUserDTO = {
	id: string;
	email: string;
	name: string;
	createdAt: TISODateString;
	modifiedAt: TISODateString;
};

export type TUserCreateDTO = {
	id: Id;
	email: string;
	name: string;
	createdAt: TISODateString;
};

export type TUserUpdateDTO = Partial<Pick<TUserCreateDTO, 'email' | 'name'>>;
