import { Database } from '@/core/infrastructure/database/database';
import type {
	IDatabase,
	IDatabaseCollectionFactory,
	IStorage,
} from '@/core/infrastructure/database/types';
import type { IEnvironment } from '@/core/modules/settings/infrastructure/environment/types';

export function databaseFactory(
	storage: IStorage,
	databaseCollectionFactory: IDatabaseCollectionFactory,
	environment: IEnvironment,
): IDatabase {
	return new Database(storage, databaseCollectionFactory, {
		namespace: environment.storage.namespace,
		useCache: environment.storage.cache,
	});
}
