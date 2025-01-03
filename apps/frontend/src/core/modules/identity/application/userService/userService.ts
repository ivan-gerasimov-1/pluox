/**
 * @todo
 * 1. Implement UserRepository and store multiple users
 */
import type { TUserCreateDTO } from '@root/core/modules/identity/application/dto/userDTO';
import type { IUserService } from '@root/core/modules/identity/application/userService/types';
import type { IUser } from '@root/core/modules/identity/domain/userEntity/types';
import type { IUserMapper } from '@root/core/modules/identity/infrastructure/userMapper/types';

export class UserService implements IUserService {
	constructor(private readonly userMapper: IUserMapper) {}

	public createUser(userCreateDTO: TUserCreateDTO): IUser {
		return this.userMapper.toEntity({
			...userCreateDTO,
			modifiedAt: userCreateDTO.modifiedAt ?? userCreateDTO.createdAt,
		});
	}
}
