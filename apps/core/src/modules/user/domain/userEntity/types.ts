import type { IEntity } from '@pluox/core/src/domain/entity/types';

import type { TLocaleCode } from '@pluox/core/src/modules/intl/domain/types';

export interface IUser extends IEntity {
	readonly id: string;
	readonly email: string;

	name: string;
	locale: TLocaleCode;
}
