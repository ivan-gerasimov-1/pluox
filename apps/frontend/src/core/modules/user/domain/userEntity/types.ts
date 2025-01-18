import type { IEntity } from '@root/core/domain/entity/types';
import type { ELocaleCode } from '@root/core/modules/intl/domain/enums';

export interface IUser extends IEntity {
	readonly id: string;
	readonly email: string;

	name: string;
	locale: ELocaleCode;
}
