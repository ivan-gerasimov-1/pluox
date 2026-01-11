import type { IDatabase } from '@/core/infrastructure/database/types';
import { DataSource } from '@/core/infrastructure/dataSource/dataSource';

import type { TAppConfig } from '@/core/modules/settings/domain/appConfig/types';
import { APP_CONFIG_STORAGE_ID } from '@/core/modules/settings/infrastructure/appConfigDataSource/constants';
import type { IAppConfigDataSource } from '@/core/modules/settings/infrastructure/appConfigDataSource/types';

export function appConfigDataSourceFactory(
	database: IDatabase,
): IAppConfigDataSource {
	let collection = database.collection(APP_CONFIG_STORAGE_ID);

	return new DataSource<TAppConfig>(collection);
}
