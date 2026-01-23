import { Database } from '@pluox/core/src/infrastructure/database/database';
import type {
	IDatabase,
	IDatabaseCollectionFactory,
	IStorage,
} from '@pluox/core/src/infrastructure/database/types';

import type { IEnvironment } from '@pluox/core/src/modules/settings/infrastructure/environment/types';

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
