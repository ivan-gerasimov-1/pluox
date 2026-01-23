import type { IDatabase } from '@pluox/core/src/infrastructure/database/types';
import { DataSource } from '@pluox/core/src/infrastructure/dataSource/dataSource';

import type { TSessionDTO } from '@pluox/core/src/modules/identity/application/dto/sessionDTO';
import { SESSION_STORAGE_ID } from '@pluox/core/src/modules/identity/infrastructure/sessionDataSource/constants';
import type { ISessionDataSource } from '@pluox/core/src/modules/identity/infrastructure/sessionDataSource/types';

export function sessionDataSourceFactory(
	database: IDatabase,
): ISessionDataSource {
	let collection = database.collection(SESSION_STORAGE_ID);

	return new DataSource<TSessionDTO>(collection);
}
