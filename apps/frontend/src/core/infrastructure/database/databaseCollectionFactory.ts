import { DatabaseCollection } from '@root/core/infrastructure/database/databaseCollection';
import { DatabaseCollectionCacheDecorator } from '@root/core/infrastructure/database/databaseCollectionDecorator/databaseCollectionCache';
import type {
	IDatabaseCollectionFactory,
	IDatabaseCollection,
	IStorage,
} from '@root/core/infrastructure/database/types';

export class DatabaseCollectionFactory implements IDatabaseCollectionFactory {
	public create(
		storage: IStorage,
		options: {
			id: string;
			useCache: boolean;
		},
	): IDatabaseCollection {
		let databaseCollection: IDatabaseCollection = new DatabaseCollection(
			storage,
			{
				id: options.id,
			},
		);

		if (options.useCache) {
			databaseCollection = new DatabaseCollectionCacheDecorator(
				databaseCollection,
			);
		}

		return databaseCollection;
	}
}
