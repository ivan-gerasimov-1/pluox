import type { TUserDTO } from '@root/core/modules/user/application/dto/userDTO';
import type { IUser } from '@root/core/modules/user/domain/userEntity/types';
import { User } from '@root/core/modules/user/domain/userEntity/user';
import type { IUserMapper } from '@root/core/modules/user/infrastructure/userMapper/types';

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
		return new User(
			userDTO.id,
			userDTO.email,
			userDTO.name,
			userDTO.createdAt,
			userDTO.modifiedAt,
		);
	}
}
