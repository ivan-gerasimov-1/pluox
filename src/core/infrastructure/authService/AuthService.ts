import type { IAuthSerivce } from '@core/infrastructure/authService/types';
import { SupabaseClient } from '@core/infrastructure/supabaseClient/SupabaseClient';
import type { ISupabaseClient } from '@core/infrastructure/supabaseClient/types';

export class AuthService implements IAuthSerivce {
	static #instance: IAuthSerivce;

	private constructor(private readonly client: ISupabaseClient) {}

	public static getInstance(): IAuthSerivce {
		if (!this.#instance) {
			const supabaseClient = SupabaseClient.getInstance();

			this.#instance = new AuthService(supabaseClient);
		}

		return this.#instance;
	}

	public async signIn(email: string, password: string): Promise<void> {
		let response = await this.client.auth.signInWithPassword({
			email,
			password,
		});

		console.log(response);
	}
}
