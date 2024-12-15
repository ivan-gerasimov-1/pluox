import { LocalStorageDataSource } from '@root/core/infrastructure/dataSource/dataSource';
import type {
	IUserStorage,
	TUser,
} from '@core/infrastructure/userStorage/types';

export class UserStorage
	extends LocalStorageDataSource<TUser>
	implements IUserStorage
{
	static readonly #STORAGE_ID: string = 'user';

	constructor() {
		super(UserStorage.#STORAGE_ID);
	}
}
