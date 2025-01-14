import { LocalStorageObjectDataSource } from '@root/core/infrastructure/dataSource/localStorageObjectDataSource';
import type { TSessionDTO } from '@root/core/modules/identity/application/dto/sessionDTO';
import type { ISessionDataSource } from '@root/core/modules/identity/infrastructure/sessionDataSource/types';

const SESSION_STORAGE_ID = 'session';

export function sessionDataSourceFactory(storage: Storage): ISessionDataSource {
	return new LocalStorageObjectDataSource<TSessionDTO>(storage, {
		id: SESSION_STORAGE_ID,
	});
}
