import { LocalStorageObjectDataSource } from '@root/core/infrastructure/dataSource/localStorageObjectDataSource';
import type { TAppConfig } from '@root/core/modules/settings/domain/appConfig/types';
import type { IAppConfigDataSource } from '@root/core/modules/settings/infrastructure/appConfigDataSource/types';

const STORAGE_ID = 'appConfig';

export function appConfigDataSourceFactory(): IAppConfigDataSource {
	return new LocalStorageObjectDataSource<TAppConfig>(STORAGE_ID);
}
