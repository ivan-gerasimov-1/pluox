import type { IStorage } from '@root/core/infrastructure/database/types';
import { ObjectDataSource } from '@root/core/infrastructure/dataSource/objectDataSource';
import type { TAppConfig } from '@root/core/modules/settings/domain/appConfig/types';
import type { IAppConfigDataSource } from '@root/core/modules/settings/infrastructure/appConfigDataSource/types';
import { STORAGE_NAMESPACE } from '@root/core/modules/settings/infrastructure/environment/constants';

const APP_CONFIG_STORAGE_ID = 'appConfig';

export function appConfigDataSourceFactory(
	storage: IStorage,
): IAppConfigDataSource {
	return new ObjectDataSource<TAppConfig>(storage, {
		id: APP_CONFIG_STORAGE_ID,
		namespace: STORAGE_NAMESPACE,
	});
}
