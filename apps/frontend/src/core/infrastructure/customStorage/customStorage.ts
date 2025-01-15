import type {
	ICustomCollection,
	ICustomCollectionFactory,
	ICustomStorage,
} from '@root/core/infrastructure/customStorage/types';

export class CustomStorage implements ICustomStorage {
	readonly #collections: Map<string, ICustomCollection>;

	constructor(
		private readonly storage: Storage,
		private readonly customCollectionFactory: ICustomCollectionFactory,
		private readonly options: {
			namespace: string;
		},
	) {
		this.#collections = new Map();
	}

	public collection(collectionName: string): ICustomCollection {
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
