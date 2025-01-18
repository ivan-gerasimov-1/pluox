import type { IDatabase } from '@root/core/infrastructure/database/types';
import { DataSource } from '@root/core/infrastructure/dataSource/dataSource';
import type { TSessionDTO } from '@root/core/modules/identity/application/dto/sessionDTO';
import { SESSION_STORAGE_ID } from '@root/core/modules/identity/infrastructure/sessionDataSource/constants';
import type { ISessionDataSource } from '@root/core/modules/identity/infrastructure/sessionDataSource/types';

export function sessionDataSourceFactory(
	database: IDatabase,
): ISessionDataSource {
	let collection = database.collection(SESSION_STORAGE_ID);

	return new DataSource<TSessionDTO>(collection);
}
