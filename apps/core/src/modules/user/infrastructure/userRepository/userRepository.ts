import { Repository } from '@pluox/core/src/infrastructure/repository/repository';

import type { TUserDTO } from '@pluox/core/src/modules/user/application/dto/userDTO';
import type { IUser } from '@pluox/core/src/modules/user/domain/userEntity/types';
import type {
	IUserRepository,
	TUserFindOptions,
} from '@pluox/core/src/modules/user/domain/userRepository/types';
import type { IUserDataSource } from '@pluox/core/src/modules/user/infrastructure/userDataSource/types';
import type { IUserMapper } from '@pluox/core/src/modules/user/infrastructure/userMapper/types';

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
