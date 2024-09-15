import type { IAuthApi } from '@core/infrastructure/authApi/types';
import { BaseApi } from '@core/infrastructure/baseApi/BaseApi';
import type { IBaseApi } from '@core/infrastructure/baseApi/types';

export class AuthApi implements IAuthApi {
	static #instance: AuthApi;

	private constructor(private readonly api: IBaseApi) {}

	public static getInstance(): AuthApi {
		if (!this.#instance) {
			const baseApi = BaseApi.getInstance();

			this.#instance = new AuthApi(baseApi);
		}

		return this.#instance;
	}

	public async signIn(
		email: string,
		password: string,
	): Promise<{
		email: string;
	}> {
		const response = await this.api.request<
			{
				email: string;
				password: string;
			},
			{ email: string }
		>('/signup', {
			email,
			password,
		});

		return {
			email: response.email,
		};
	}

	public async logIn(
		email: string,
		password: string,
	): Promise<{
		id: string;
		email: string;
		token: string;
	}> {
		const response = await this.api.request<
			{
				email: string;
				password: string;
			},
			{
				id: string;
				email: string;
				token: string;
			}
		>('/login', {
			email,
			password,
		});

		return {
			id: response.id || '',
			email: response.email || '',
			token: response.token || '',
		};
	}
}
