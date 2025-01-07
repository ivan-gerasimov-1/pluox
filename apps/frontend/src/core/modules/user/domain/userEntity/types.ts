import type { IEntity } from '@root/core/domain/entity/types';

export interface IUser extends IEntity {
	readonly id: string;
	readonly email: string;

	name: string;
}
