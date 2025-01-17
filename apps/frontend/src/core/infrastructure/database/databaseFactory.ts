import { Database } from '@root/core/infrastructure/database/database';
import type {
	IDatabaseCollectionFactory,
	IDatabase,
	IStorage,
} from '@root/core/infrastructure/database/types';
import type { IEnvironment } from '@root/core/modules/settings/infrastructure/environment/types';

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
