import type { IDatabaseClient } from '@core/infrastructure/databaseClient/types';

export class DatabaseClient implements IDatabaseClient {
	static #instance?: IDatabaseClient;

	private constructor() {}

	public static getInstance(): IDatabaseClient {
		if (!this.#instance) {
			this.#instance = new DatabaseClient();
		}

		return this.#instance;
	}

	public async add<T>(target: string, payload: T): Promise<void> {
		return Promise.resolve();
	}
}
