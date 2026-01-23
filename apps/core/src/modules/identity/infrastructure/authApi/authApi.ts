import type { IApiClient } from '@pluox/core/src/infrastructure/apiClient/types';

import type { IAuthApi } from '@pluox/core/src/modules/identity/infrastructure/authApi/types';

export class AuthApi implements IAuthApi {
	constructor(private readonly apiClient: IApiClient) {}

	public async signUp(
		email: string,
		password: string,
	): Promise<{
		email: string;
	}> {
		const response = await this.apiClient.post<
			{
				email: string;
				password: string;
			},
			{
				email: string;
			}
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
		name: string;
		createdAt: string;
		modifiedAt: string;
		token: string;
	}> {
		const response = await this.apiClient.post<
			{
				email: string;
				password: string;
			},
			{
				id: string;
				email: string;
				name: string;
				createdAt: string;
				modifiedAt: string;
				token: string;
			}
		>('/login', {
			email,
			password,
		});

		return {
			id: response.id,
			email: response.email,
			name: response.name,
			createdAt: response.createdAt,
			modifiedAt: response.modifiedAt,
			token: response.token,
		};
	}
}
