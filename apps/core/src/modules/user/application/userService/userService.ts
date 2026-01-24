import type { IIdGenerator } from '@core/domain/idGenerator/types';
import type { ITemporal } from '@core/domain/temporal/types';
import type { Id } from '@core/domain/types';
import { ELocaleCode } from '@core/modules/intl/domain/enums';
import type {
	TUserCreateDTO,
	TUserDTO,
	TUserUpdateDTO,
} from '@core/modules/user/application/dto/userDTO';
import { UserNotFoundError } from '@core/modules/user/application/userService/errors';
import type { IUserService } from '@core/modules/user/application/userService/types';
import type { IUserRepository } from '@core/modules/user/domain/userRepository/types';
import type { IUserMapper } from '@core/modules/user/infrastructure/userMapper/types';

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
