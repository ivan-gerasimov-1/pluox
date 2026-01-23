import type { TISODateString } from '@pluox/core/src/domain/temporal/types';
import type { Id } from '@pluox/core/src/domain/types';

import type { TLocaleCode } from '@pluox/core/src/modules/intl/domain/types';

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
