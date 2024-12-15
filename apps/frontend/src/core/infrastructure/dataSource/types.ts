export interface IDataSource<T extends {} = {}> {
	create(payload: T): void;
	read(): T | null;
	update(payload: Partial<T>): void;
	delete(): void;

	isEmpty(): boolean;
}
