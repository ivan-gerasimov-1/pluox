import type { IDatabase } from '@root/core/infrastructure/database/types';
import { CollectionDataSource } from '@root/core/infrastructure/dataSource/collectionDataSource';
import type { TAppConfig } from '@root/core/modules/settings/domain/appConfig/types';
import { APP_CONFIG_STORAGE_ID } from '@root/core/modules/settings/infrastructure/appConfigDataSource/constants';
import type { IAppConfigDataSource } from '@root/core/modules/settings/infrastructure/appConfigDataSource/types';

export function appConfigDataSourceFactory(
	database: IDatabase,
): IAppConfigDataSource {
	let collection = database.collection(APP_CONFIG_STORAGE_ID);

	return new CollectionDataSource<TAppConfig>(collection);
}
