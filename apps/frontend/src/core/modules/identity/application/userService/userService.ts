/**
 * @todo
 * 1. Implement UserRepository and store multiple users
 */
import type { IIdGenerator } from '@root/core/infrastructure/idGenerator/types';
import type { ITemporal } from '@root/core/infrastructure/temporal/types';
import type { TUserCreateDTO } from '@root/core/modules/identity/application/dto/userDTO';
import type { IUserService } from '@root/core/modules/identity/application/userService/types';
import type { IUser } from '@root/core/modules/identity/domain/userEntity/types';
import type { IUserMapper } from '@root/core/modules/identity/infrastructure/userMapper/types';

export class UserService implements IUserService {
	constructor(
		private readonly userMapper: IUserMapper,
		private readonly idGenerator: IIdGenerator,
		private readonly temporal: ITemporal,
	) {}

	public createUser(userCreateDTO: TUserCreateDTO): IUser {
		let id = userCreateDTO.id ?? this.idGenerator.getId();
		let createdAt = userCreateDTO.createdAt ?? this.temporal.getISODateString();
		let modifiedAt = userCreateDTO.modifiedAt ?? createdAt;

		return this.userMapper.toEntity({
			id,
			email: userCreateDTO.email,
			name: userCreateDTO.name,
			createdAt,
			modifiedAt,
		});
	}
}
