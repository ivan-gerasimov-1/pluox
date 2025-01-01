import { LocalStorageDataSource } from '@root/core/infrastructure/dataSource/dataSource';
import type { TUserDTO } from '@root/core/modules/identity/application/dto/userDTO';
import type { IUserDataSource } from '@root/core/modules/identity/infrastructure/userDataSource/types';

export class UserDataSource
	extends LocalStorageDataSource<TUserDTO>
	implements IUserDataSource
{
	static readonly #STORAGE_ID: string = 'user';

	constructor() {
		super(UserDataSource.#STORAGE_ID);
	}
}
