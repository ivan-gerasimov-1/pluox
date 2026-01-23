import type { IDatabase } from '@pluox/core/src/infrastructure/database/types';
import { DataSource } from '@pluox/core/src/infrastructure/dataSource/dataSource';

import type { TAppConfig } from '@pluox/core/src/modules/settings/domain/appConfig/types';
import { APP_CONFIG_STORAGE_ID } from '@pluox/core/src/modules/settings/infrastructure/appConfigDataSource/constants';
import type { IAppConfigDataSource } from '@pluox/core/src/modules/settings/infrastructure/appConfigDataSource/types';

export function appConfigDataSourceFactory(
	database: IDatabase,
): IAppConfigDataSource {
	let collection = database.collection(APP_CONFIG_STORAGE_ID);

	return new DataSource<TAppConfig>(collection);
}
