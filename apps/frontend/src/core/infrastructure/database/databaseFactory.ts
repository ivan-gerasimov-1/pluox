import { Database } from '@root/core/infrastructure/database/databaseStorage';
import type {
	IDatabaseCollectionFactory,
	IDatabase,
	IDatabaseFactory,
	IStorage,
} from '@root/core/infrastructure/database/types';
import type { IEnvironment } from '@root/core/modules/settings/infrastructure/environment/types';

export class DatabaseFactory implements IDatabaseFactory {
	constructor(
		private readonly storage: IStorage,
		private readonly databaseCollectionFactory: IDatabaseCollectionFactory,
		private readonly environment: IEnvironment,
	) {}

	public create(): IDatabase {
		return new Database(this.storage, this.databaseCollectionFactory, {
			namespace: this.environment.storage.namespace,
			useCache: this.environment.storage.cache,
		});
	}
}
