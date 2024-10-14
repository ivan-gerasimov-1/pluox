import { AppConfig } from '@core/infrastructure/appConfig/AppConfig';
import { SupabaseClient as _SupabaseClient } from '@supabase/supabase-js';

export class SupabaseClient extends _SupabaseClient {
	static #instance?: SupabaseClient;

	private constructor(config: { apiUrl: string; apiKey: string }) {
		super(config.apiUrl, config.apiKey);
	}

	public static getInstance(): SupabaseClient {
		if (!this.#instance) {
			const appConfig = AppConfig.getInstance();
			const supabase = appConfig.supabase;

			this.#instance = new SupabaseClient({
				apiUrl: supabase.apiUrl,
				apiKey: supabase.apiKey,
			});
		}

		return this.#instance;
	}
}
