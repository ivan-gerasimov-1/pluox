import type { TUserDTO } from '@root/core/modules/identity/application/dto/userDTO';
import type { IUser } from '@root/core/modules/identity/domain/userEntity/types';
import { User } from '@root/core/modules/identity/domain/userEntity/user';
import type { IUserMapper } from '@root/core/modules/identity/infrastructure/userMapper/types';

export class UserMapper implements IUserMapper {
	public toDTO(user: IUser): TUserDTO {
		return {
			id: user.id,
			email: user.email,
			name: user.name,
			createdAt: user.createdAt,
			modifiedAt: user.modifiedAt,
		};
	}

	public toEntity(userDTO: TUserDTO): IUser {
		return User.create(
			userDTO.id,
			userDTO.email,
			userDTO.name,
			userDTO.createdAt,
			userDTO.modifiedAt,
		);
	}
}
