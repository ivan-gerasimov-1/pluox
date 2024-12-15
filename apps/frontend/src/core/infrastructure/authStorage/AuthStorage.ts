import { LocalStorageDataSource } from '@root/core/infrastructure/dataSource/dataSource';
import type { IAuthStorage } from '@core/infrastructure/authStorage/types';

export class AuthStorage
	extends LocalStorageDataSource<string>
	implements IAuthStorage
{
	static readonly #STORAGE_ID: string = 'token';

	constructor() {
		super(AuthStorage.#STORAGE_ID);
	}
}
