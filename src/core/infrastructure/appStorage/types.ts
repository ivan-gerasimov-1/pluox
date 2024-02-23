export interface IAppStorage<T extends {} = {}> {
	get(id: string): T | null;
	set(id: string, data: T): void;
	clear(id: string): void;
}
