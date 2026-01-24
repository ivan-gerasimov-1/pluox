import type { IDatabase } from '@core/infrastructure/database/types';
import { DataSource } from '@core/infrastructure/dataSource/dataSource';
import type { TSessionDTO } from '@core/modules/identity/application/dto/sessionDTO';
import { SESSION_STORAGE_ID } from '@core/modules/identity/infrastructure/sessionDataSource/constants';
import type { ISessionDataSource } from '@core/modules/identity/infrastructure/sessionDataSource/types';

export function sessionDataSourceFactory(
	database: IDatabase,
): ISessionDataSource {
	let collection = database.collection(SESSION_STORAGE_ID);

	return new DataSource<TSessionDTO>(collection);
}
