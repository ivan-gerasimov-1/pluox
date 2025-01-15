import { CustomCollection } from '@root/core/infrastructure/customStorage/customCollection';
import { CustomCollectionFactory } from '@root/core/infrastructure/customStorage/customCollectionFactory';

export class CustomStorage {
	readonly #collections: Map<string, CustomCollection>;

	constructor(
		private readonly storage: Storage,
		private readonly customCollectionFactory: CustomCollectionFactory,
		private readonly options: {
			namespace: string;
		},
	) {
		this.#collections = new Map();
	}

	public collection(collectionName: string): CustomCollection {
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
