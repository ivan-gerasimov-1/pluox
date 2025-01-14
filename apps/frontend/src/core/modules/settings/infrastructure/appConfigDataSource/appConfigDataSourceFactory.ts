import { LocalStorageObjectDataSource } from '@root/core/infrastructure/dataSource/localStorageObjectDataSource';
import type { TAppConfig } from '@root/core/modules/settings/domain/appConfig/types';
import type { IAppConfigDataSource } from '@root/core/modules/settings/infrastructure/appConfigDataSource/types';

const APP_CONFIG_STORAGE_ID = 'appConfig';

export function appConfigDataSourceFactory(
	storage: Storage,
): IAppConfigDataSource {
	return new LocalStorageObjectDataSource<TAppConfig>(storage, {
		id: APP_CONFIG_STORAGE_ID,
	});
}
