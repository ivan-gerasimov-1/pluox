import type { TISODateString } from '@/core/domain/temporal/types';
import type { Id } from '@/core/domain/types';

import type { TLocaleCode } from '@/core/modules/intl/domain/types';

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
