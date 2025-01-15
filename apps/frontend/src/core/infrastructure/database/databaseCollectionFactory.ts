import { DatabaseCollection } from '@root/core/infrastructure/database/databaseCollection';
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
		},
	): IDatabaseCollection {
		return new DatabaseCollection(storage, {
			id: options.id,
		});
	}
}
