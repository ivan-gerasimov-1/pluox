export interface IAppStorage<T extends {} = {}> {
	create(payload: T): void;
	read(): T | null;
	update(payload: T): void;
	delete(): void;

	isEmpty(): boolean;
}
