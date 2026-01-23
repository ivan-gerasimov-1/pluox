export interface IStorage extends Storage {}

export interface IDatabase {
	collection(collectionName: string): IDatabaseCollection;
}

export interface IDatabaseCollection {
	has(id: string): boolean;

	readOne<T>(id: string): T | null;
	readAll<T>(): T[];
	writeOne<T>(id: string, payload: T): T | null;
	updateOne<T>(id: string, payload: Partial<T>): T | null;
	removeOne<T>(id: string): T | null;

	clear(): void;
}

export interface IDatabaseCollectionFactory {
	create(
		storage: IStorage,
		options: {
			id: string;
			useCache: boolean;
		},
	): IDatabaseCollection;
}
