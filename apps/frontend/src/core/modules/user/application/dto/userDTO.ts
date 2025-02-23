import type { Id } from '@root/core/domain/types';
import type { TISODateString } from '@root/core/domain/temporal/types';
import type { TLocaleCode } from '@root/core/modules/intl/domain/types';

export type TUserDTO = {
	id: string;
	email: string;
	name: string;
	locale: TLocaleCode;
	createdAt: TISODateString;
	modifiedAt: TISODateString;
};

export type TUserCreateDTO = {
	id?: Id;
	email: string;
	name: string;
	locale?: TLocaleCode;
	createdAt?: TISODateString;
	modifiedAt?: TISODateString;
};

export type TUserUpdateDTO = Partial<
	Pick<TUserCreateDTO, 'email' | 'name' | 'locale'>
>;
