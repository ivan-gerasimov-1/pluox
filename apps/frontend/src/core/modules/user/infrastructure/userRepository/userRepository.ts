import type {
	TFindManyOptions,
	TFindManyResult,
} from '@root/core/domain/repository/types';
import type { Id } from '@root/core/domain/types';
import type { IUser } from '@root/core/modules/user/domain/userEntity/types';
import type {
	IUserRepository,
	TUserFindOptions,
} from '@root/core/modules/user/domain/userRepository/types';
import type { IUserDataSource } from '@root/core/modules/user/infrastructure/userDataSource/types';
import type { IUserMapper } from '@root/core/modules/user/infrastructure/userMapper/types';

export class UserRepository implements IUserRepository {
	constructor(
		private readonly dataSource: IUserDataSource,
		private readonly mapper: IUserMapper,
	) {}

	public save(user: IUser): IUser {
		let userDTO = this.mapper.toDTO(user);

		this.dataSource.upsert(userDTO);

		return user;
	}

	public findMany(
		options?: TFindManyOptions<TUserFindOptions>,
	): TFindManyResult<IUser> {
		let users = this.dataSource.findMany(options);

		return {
			items: users.items.map(this.mapper.toEntity),
			total: users.total,
		};
	}

	public findById(id: Id): IUser | null {
		let user = this.dataSource.findOne({
			id,
		});

		return user ? this.mapper.toEntity(user) : null;
	}

	public remove(id: Id): IUser | null {
		throw new Error('Not Implemented');
	}
}
