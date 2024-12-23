import { LocalStorageDataSource } from '@root/core/infrastructure/dataSource/dataSource';
import type {
	IUserDataSource,
	TUser,
} from '@root/core/infrastructure/userDataSource/types';

export class UserDataSource
	extends LocalStorageDataSource<TUser>
	implements IUserDataSource
{
	static readonly #STORAGE_ID: string = 'user';

	constructor() {
		super(UserDataSource.#STORAGE_ID);
	}
}
