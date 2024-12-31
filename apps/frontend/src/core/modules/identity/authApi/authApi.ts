import type { IAuthApi } from '@root/core/modules/identity/authApi/types';
import type { IBaseApi } from '@core/infrastructure/baseApi/types';

export class AuthApi implements IAuthApi {
	constructor(private readonly api: IBaseApi) {}

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
			id: response.id,
			email: response.email,
			token: response.token,
		};
	}
}
