import type {
	TFindManyOptions,
	TFindManyResult,
} from '@root/core/domain/repository/types';
import type { Id } from '@root/core/domain/types';
import type { IUser } from '@root/core/modules/identity/domain/userEntity/types';
import type {
	IUserRepository,
	TUserFindOptions,
} from '@root/core/modules/identity/domain/userRepository/types';
import type { IUserDataSource } from '@root/core/modules/identity/infrastructure/userDataSource/types';
import type { IUserMapper } from '@root/core/modules/identity/infrastructure/userMapper/types';

export class UserRepository implements IUserRepository {
	constructor(
		private readonly userDataSource: IUserDataSource,
		private readonly userMapper: IUserMapper,
	) {}

	public save(entity: IUser): IUser {
		throw new Error('Not Implemented');
	}

	public findMany(
		options?: TFindManyOptions<TUserFindOptions>,
	): TFindManyResult<IUser> {
		throw new Error('Not Implemented');
	}

	public findOne(options: TUserFindOptions): IUser | null {
		throw new Error('Not Implemented');
	}

	public findById(id: Id): IUser | null {
		throw new Error('Not Implemented');
	}

	public remove(id: Id): IUser | null {
		throw new Error('Not Implemented');
	}
}
