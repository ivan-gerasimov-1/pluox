import type {
	TFindManyOptions,
	TFindManyResult,
} from '@root/core/domain/repository/types';
import { LocalStorageCollectionDataSource } from '@root/core/infrastructure/dataSource/localStorageCollectionDataSource';
import type { TUserDTO } from '@root/core/modules/user/application/dto/userDTO';
import type { TUserFindOptions } from '@root/core/modules/user/domain/userRepository/types';
import type { IUserDataSource } from '@root/core/modules/user/infrastructure/userDataSource/types';

export class UserDataSource
	extends LocalStorageCollectionDataSource<TUserDTO, TUserFindOptions>
	implements IUserDataSource
{
	static readonly #STORAGE_ID: string = 'user';

	constructor() {
		super(UserDataSource.#STORAGE_ID);
	}

	public override findMany(
		options?: TFindManyOptions<TUserFindOptions>,
	): TFindManyResult<TUserDTO> {
		let users = this.read();
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
