export interface IStorage extends Storage {}

export interface IDatabase {
	collection(collectionName: string): IDatabaseCollection;
}

export interface IDatabaseFactory {
	create(): IDatabase;
}

export interface IDatabaseCollection {
	has(id: string): boolean;

	readOne<T>(id: string): T | null;
	readAll<T extends { id: string }>(): T[];
	writeOne<T>(payload: T & { id: string }): T | null;
	updateOne<T>(id: string, payload: Partial<T>): T | null;
	removeOne<T>(id: string): T | null;

	drop(): void;
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
