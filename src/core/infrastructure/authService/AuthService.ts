import type { IAuthSerivce } from '@core/infrastructure/authService/types';
import { SupabaseClient } from '@core/infrastructure/supabaseClient/SupabaseClient';
import type { ISupabaseClient } from '@core/infrastructure/supabaseClient/types';

export class AuthService implements IAuthSerivce {
	static #instance: IAuthSerivce;

	public userId: string = '';
	public email: string = '';

	private constructor(private readonly client: ISupabaseClient) {}

	public static getInstance(): IAuthSerivce {
		if (!this.#instance) {
			const supabaseClient = SupabaseClient.getInstance();

			this.#instance = new AuthService(supabaseClient);
		}

		return this.#instance;
	}

	public async signIn(
		email: string,
		password: string,
	): Promise<{
		userId: string;
		email: string;
	}> {
		let response = await this.client.auth.signInWithPassword({
			email,
			password,
		});

		this.userId = response.data.user?.id || '';
		this.email = response.data.user?.email || '';

		return {
			userId: this.userId,
			email: this.email,
		};
	}
}
