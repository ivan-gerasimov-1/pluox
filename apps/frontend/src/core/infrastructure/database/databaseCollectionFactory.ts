import { DatabaseCollection } from '@/core/infrastructure/database/databaseCollection';
import { DatabaseCollectionCacheDecorator } from '@/core/infrastructure/database/databaseCollectionDecorator/databaseCollectionCache';
import type {
	IDatabaseCollection,
	IDatabaseCollectionFactory,
	IStorage,
} from '@/core/infrastructure/database/types';

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
