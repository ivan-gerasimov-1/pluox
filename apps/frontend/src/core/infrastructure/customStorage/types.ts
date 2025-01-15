export interface ICustomStorage {
	collection(collectionName: string): ICustomCollection;
}

export interface ICustomStorageFactory {
	create(): ICustomStorage;
}

export interface ICustomCollection {
	readData(): any;
	writeData(data: any): void;
	clearData(): void;

	has(id: string): boolean;

	readOne<T>(id: string): T | null;
	readAll<T>(): T[];
	writeOne<T>(payload: T & { id: string }): T | null;
	updateOne<T>(id: string, payload: Partial<T>): T | null;
	removeOne<T>(id: string): T | null;
}

export interface ICustomCollectionFactory {
	create(
		storage: Storage,
		options: {
			id: string;
		},
	): ICustomCollection;
}
