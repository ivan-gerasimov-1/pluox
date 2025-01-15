import type {
	IDatabaseCollection,
	IDatabaseCollectionFactory,
	IDatabase,
	IStorage,
} from '@root/core/infrastructure/database/types';

export class Database implements IDatabase {
	readonly #collections: Map<string, IDatabaseCollection>;

	constructor(
		private readonly storage: IStorage,
		private readonly customCollectionFactory: IDatabaseCollectionFactory,
		private readonly options: {
			namespace: string;
		},
	) {
		this.#collections = new Map();
	}

	public collection(collectionName: string): IDatabaseCollection {
		let collectionId = this.makeId(collectionName, this.options.namespace);
		let collection = this.#collections.get(collectionId);

		if (!collection) {
			collection = this.customCollectionFactory.create(this.storage, {
				id: collectionId,
			});

			this.#collections.set(collectionId, collection);
		}

		return collection;
	}

	private makeId(collection: string, namespace: string): string {
		return `${namespace}/${collection}`;
	}
}
