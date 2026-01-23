import type { IIdGenerator } from '@pluox/core/src/domain/idGenerator/types';
import type { ITemporal } from '@pluox/core/src/domain/temporal/types';
import type { Id } from '@pluox/core/src/domain/types';

import { ELocaleCode } from '@pluox/core/src/modules/intl/domain/enums';
import type {
	TUserCreateDTO,
	TUserDTO,
	TUserUpdateDTO,
} from '@pluox/core/src/modules/user/application/dto/userDTO';
import { UserNotFoundError } from '@pluox/core/src/modules/user/application/userService/errors';
import type { IUserService } from '@pluox/core/src/modules/user/application/userService/types';
import type { IUserRepository } from '@pluox/core/src/modules/user/domain/userRepository/types';
import type { IUserMapper } from '@pluox/core/src/modules/user/infrastructure/userMapper/types';

export class UserService implements IUserService {
	constructor(
		private readonly userRepository: IUserRepository,
		private readonly userMapper: IUserMapper,
		private readonly idGenerator: IIdGenerator,
		private readonly temporal: ITemporal,
	) {}

	public createUser(userCreateDTO: TUserCreateDTO): TUserDTO {
		let id = userCreateDTO.id ?? this.idGenerator.getId();
		let locale = userCreateDTO.locale ?? ELocaleCode.RU_RU;
		let createdAt = userCreateDTO.createdAt ?? this.temporal.getISODateString();
		let modifiedAt = userCreateDTO.modifiedAt ?? createdAt;

		let user = this.userMapper.toEntity({
			id,
			email: userCreateDTO.email,
			name: userCreateDTO.name,
			locale,
			createdAt,
			modifiedAt,
		});

		let newUser = this.userRepository.save(user);

		return this.userMapper.toDTO(newUser);
	}

	public updateUser(id: Id, userUpdateDTO: TUserUpdateDTO): TUserDTO {
		let user = this.userRepository.findById(id);

		if (!user) {
			throw new UserNotFoundError();
		}

		if (userUpdateDTO.name) {
			user.name = userUpdateDTO.name;
		}

		if (userUpdateDTO.locale) {
			user.locale = userUpdateDTO.locale;
		}

		let updatedUser = this.userRepository.save(user);

		return this.userMapper.toDTO(updatedUser);
	}

	public getUserById(id: string): TUserDTO | null {
		let user = this.userRepository.findById(id);

		if (!user) {
			return null;
		}

		return this.userMapper.toDTO(user);
	}
}
