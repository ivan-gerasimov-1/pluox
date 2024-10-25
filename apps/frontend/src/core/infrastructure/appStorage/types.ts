export interface IAppStorage<T extends {} = {}> {
	get(): T | null;
	set(payload: T): void;
	clear(): void;
}
