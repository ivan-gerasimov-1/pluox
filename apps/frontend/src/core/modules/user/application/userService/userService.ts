import type { IIdGenerator } from '@root/core/domain/idGenerator/types';
import type { ITemporal } from '@root/core/domain/temporal/types';
import type {
	TUserCreateDTO,
	TUserDTO,
} from '@root/core/modules/user/application/dto/userDTO';
import type { IUserService } from '@root/core/modules/user/application/userService/types';
import type { IUserRepository } from '@root/core/modules/user/domain/userRepository/types';
import type { IUserMapper } from '@root/core/modules/user/infrastructure/userMapper/types';

export class UserService implements IUserService {
	constructor(
		private readonly userRepository: IUserRepository,
		private readonly userMapper: IUserMapper,
		private readonly idGenerator: IIdGenerator,
		private readonly temporal: ITemporal,
	) {}

	public createUser(userCreateDTO: TUserCreateDTO): TUserDTO {
		let id = userCreateDTO.id ?? this.idGenerator.getId();
		let createdAt = userCreateDTO.createdAt ?? this.temporal.getISODateString();
		let modifiedAt = userCreateDTO.modifiedAt ?? createdAt;

		let user = this.userMapper.toEntity({
			id,
			email: userCreateDTO.email,
			name: userCreateDTO.name,
			createdAt,
			modifiedAt,
		});

		let newUser = this.userRepository.save(user);

		return this.userMapper.toDTO(newUser);
	}

	public getUserById(id: string): TUserDTO | null {
		let user = this.userRepository.findById(id);

		if (!user) {
			return null;
		}

		return this.userMapper.toDTO(user);
	}
}
