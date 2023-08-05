export interface IStorage {
	get(id: string): Record<string, any> | null;
	set(id: string, data: Record<string, any>): void;
}
