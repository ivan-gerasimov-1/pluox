import type { IEntity } from '@root/core/domain/entity/types';
import type { TLocaleCode } from '@root/core/modules/intl/domain/types';

export interface IUser extends IEntity {
	readonly id: string;
	readonly email: string;

	name: string;
	locale: TLocaleCode;
}
