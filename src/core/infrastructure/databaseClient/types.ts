export interface IDatabaseClient {
	add<T>(target: string, payload: T): Promise<void>;
}
