import { createClient } from '@supabase/supabase-js';
import { AppConfig } from '@core/infrastructure/appConfig/AppConfig';
import type { SupabaseClient as ISupabaseClient } from '@supabase/supabase-js';

export interface IDatabaseClient {}

export class DatabaseClient implements IDatabaseClient {
	static #instance?: IDatabaseClient;

	private readonly client: ISupabaseClient;

	private constructor(config: { apiUrl: string; apiKey: string }) {
		this.client = createClient(config.apiUrl, config.apiKey);
	}

	public static getInstance(): IDatabaseClient {
		if (!this.#instance) {
			const appConfig = AppConfig.getInstance();
			const supabase = appConfig.supabase;

			this.#instance = new DatabaseClient({
				apiUrl: supabase.apiUrl,
				apiKey: supabase.apiKey,
			});
		}

		return this.#instance;
	}
}
