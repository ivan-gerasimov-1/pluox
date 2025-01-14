import { Repository } from '@root/core/infrastructure/repository/repository';
import type { TUserDTO } from '@root/core/modules/user/application/dto/userDTO';
import type { IUser } from '@root/core/modules/user/domain/userEntity/types';
import type {
	IUserRepository,
	TUserFindOptions,
} from '@root/core/modules/user/domain/userRepository/types';
import type { IUserDataSource } from '@root/core/modules/user/infrastructure/userDataSource/types';
import type { IUserMapper } from '@root/core/modules/user/infrastructure/userMapper/types';

export class UserRepository
	extends Repository<IUser, TUserDTO, TUserFindOptions>
	implements IUserRepository
{
	constructor(
		private readonly userDataSource: IUserDataSource,
		private readonly userMapper: IUserMapper,
	) {
		super(userDataSource, userMapper);
	}
}
