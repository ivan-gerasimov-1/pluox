import type { IDatabaseClient } from '@core/infrastructure/databaseClient/types';
import { SupabaseClient } from '@core/infrastructure/supabaseClient/SupabaseClient';
import type { ISupabaseClient } from '@core/infrastructure/supabaseClient/types';

export class DatabaseClient implements IDatabaseClient {
	static #instance?: IDatabaseClient;

	private constructor(private readonly client: ISupabaseClient) {}

	public static getInstance(): IDatabaseClient {
		if (!this.#instance) {
			const supabaseClient = SupabaseClient.getInstance();

			this.#instance = new DatabaseClient(supabaseClient);
		}

		return this.#instance;
	}

	public async add<T>(target: string, payload: T): Promise<void> {
		await this.client.from(target).upsert(payload);
	}
}
