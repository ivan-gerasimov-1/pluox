import type { IEntity } from '@root/core/domain/entity/types';
import type { TUserDTO } from '@root/core/modules/identity/application/dto/userDto';

export interface IUser extends IEntity<TUserDTO> {
	readonly id: string;
	readonly email: string;
}
