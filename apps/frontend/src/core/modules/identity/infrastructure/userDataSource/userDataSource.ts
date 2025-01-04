import type {
	TFindManyOptions,
	TFindManyResult,
} from '@root/core/domain/repository/types';
import { LocalStorageDataSource } from '@root/core/infrastructure/dataSource/dataSource';
import type { TUserDTO } from '@root/core/modules/identity/application/dto/userDTO';
import type { TUserFindOptions } from '@root/core/modules/identity/domain/userRepository/types';
import type { IUserDataSource } from '@root/core/modules/identity/infrastructure/userDataSource/types';

export class UserDataSource
	extends LocalStorageDataSource<Record<string, TUserDTO>>
	implements IUserDataSource
{
	static readonly #STORAGE_ID: string = 'user';

	constructor() {
		super(UserDataSource.#STORAGE_ID);
	}

	public save(user: TUserDTO): TUserDTO {
		this.update({
			[user.id]: user,
		});

		return user;
	}

	public findMany(
		options?: TFindManyOptions<TUserFindOptions>,
	): TFindManyResult<TUserDTO> {
		let users = this.read();

		if (users === null) {
			return {
				items: [],
				total: 0,
			};
		}

		let filteredUsers = Object.values(users);

		if (options?.limit) {
			filteredUsers = filteredUsers.slice(0, options.limit);
		}

		return {
			items: filteredUsers,
			total: filteredUsers.length,
		};
	}
}
