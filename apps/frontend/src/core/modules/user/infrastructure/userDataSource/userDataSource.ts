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
}
