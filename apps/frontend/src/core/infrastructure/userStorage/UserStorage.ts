import { LocalStorageDataSource } from '@core/infrastructure/appStorage/AppStorage';
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
