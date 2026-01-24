import type {
	IDatabase,
	IDatabaseCollection,
	IDatabaseCollectionFactory,
	IStorage,
} from '@core/infrastructure/database/types';

export class Database implements IDatabase {
	readonly #collections: Map<string, IDatabaseCollection>;

	constructor(
		private readonly storage: IStorage,
		private readonly databaseCollectionFactory: IDatabaseCollectionFactory,
		private readonly options: {
			namespace: string;
			useCache: boolean;
		},
	) {
		this.#collections = new Map();
	}

	public collection(collectionName: string): IDatabaseCollection {
		let collectionId = this.makeId(collectionName, this.options.namespace);
		let collection = this.#collections.get(collectionId);

		if (!collection) {
			collection = this.databaseCollectionFactory.create(this.storage, {
				id: collectionId,
				useCache: this.options.useCache,
			});

			this.#collections.set(collectionId, collection);
		}

		return collection;
	}

	private makeId(collection: string, namespace: string): string {
		return `${namespace}/${collection}`;
	}
}
