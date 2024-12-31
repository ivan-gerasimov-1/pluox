import { LocalStorageDataSource } from '@root/core/infrastructure/dataSource/dataSource';
import type { IAuthDataSource } from '@root/core/modules/identity/authDataSource/types';

export class AuthDataSource
	extends LocalStorageDataSource<string>
	implements IAuthDataSource
{
	static readonly #STORAGE_ID: string = 'token';

	constructor() {
		super(AuthDataSource.#STORAGE_ID);
	}
}
