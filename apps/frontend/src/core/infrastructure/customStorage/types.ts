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
}

export interface ICustomCollectionFactory {
	create(
		storage: Storage,
		options: {
			id: string;
		},
	): ICustomCollection;
}
