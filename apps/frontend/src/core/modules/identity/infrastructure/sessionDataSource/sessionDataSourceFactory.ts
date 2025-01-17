import type { IStorage } from '@root/core/infrastructure/database/types';
import { ObjectDataSource } from '@root/core/infrastructure/dataSource/objectDataSource';
import type { TSessionDTO } from '@root/core/modules/identity/application/dto/sessionDTO';
import type { ISessionDataSource } from '@root/core/modules/identity/infrastructure/sessionDataSource/types';
import { STORAGE_NAMESPACE } from '@root/core/modules/settings/infrastructure/environment/constants';

const SESSION_STORAGE_ID = 'session';

export function sessionDataSourceFactory(
	storage: IStorage,
): ISessionDataSource {
	return new ObjectDataSource<TSessionDTO>(storage, {
		id: SESSION_STORAGE_ID,
		namespace: STORAGE_NAMESPACE,
	});
}
