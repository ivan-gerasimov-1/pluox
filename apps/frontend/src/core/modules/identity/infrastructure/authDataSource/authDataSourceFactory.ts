import { LocalStorageDataSource } from '@root/core/infrastructure/dataSource/dataSource';
import type { IAuthDataSource } from '@root/core/modules/identity/infrastructure/authDataSource/types';

const STORAGE_ID = 'token';

export function authDataSourceFactory(): IAuthDataSource {
	return new LocalStorageDataSource<string>(STORAGE_ID);
}
