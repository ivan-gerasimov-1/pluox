import type { Id } from '@root/core/domain/types';
import type { TISODateString } from '@root/core/domain/temporal/types';
import type { ELocaleCode } from '@root/core/modules/intl/domain/enums';

export type TUserDTO = {
	id: string;
	email: string;
	name: string;
	locale: ELocaleCode;
	createdAt: TISODateString;
	modifiedAt: TISODateString;
};

export type TUserCreateDTO = {
	id?: Id;
	email: string;
	name: string;
	locale?: ELocaleCode;
	createdAt?: TISODateString;
	modifiedAt?: TISODateString;
};

export type TUserUpdateDTO = Partial<
	Pick<TUserCreateDTO, 'email' | 'name' | 'locale'>
>;
