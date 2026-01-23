import type { TUserDTO } from '@pluox/core/src/modules/user/application/dto/userDTO';
import type { IUser } from '@pluox/core/src/modules/user/domain/userEntity/types';
import { User } from '@pluox/core/src/modules/user/domain/userEntity/user';
import type { IUserMapper } from '@pluox/core/src/modules/user/infrastructure/userMapper/types';

export class UserMapper implements IUserMapper {
	public toDTO(user: IUser): TUserDTO {
		return {
			id: user.id,
			email: user.email,
			name: user.name,
			locale: user.locale,
			createdAt: user.createdAt,
			modifiedAt: user.modifiedAt,
		};
	}

	public toEntity(userDTO: TUserDTO): IUser {
		return new User(
			userDTO.id,
			userDTO.email,
			userDTO.name,
			userDTO.locale,
			userDTO.createdAt,
			userDTO.modifiedAt,
		);
	}
}
