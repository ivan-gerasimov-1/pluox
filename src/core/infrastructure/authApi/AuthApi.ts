import {
	AppConfig,
	type IAppConfig,
} from '@core/infrastructure/appConfig/AppConfig';
import type { IAuthApi } from '@core/infrastructure/authApi/types';

export class AuthApi implements IAuthApi {
	static #instance: AuthApi;

	private constructor(private readonly appConfig: IAppConfig) {}

	public static getInstance(): AuthApi {
		if (!this.#instance) {
			const appConfig = AppConfig.getInstance();

			this.#instance = new AuthApi(appConfig);
		}

		return this.#instance;
	}

	public async signIn(
		email: string,
		password: string,
	): Promise<{
		email: string;
	}> {
		const response = await this.request<{
			email: string;
		}>('/signup', {
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
		const response = await this.request<{
			id: string;
			email: string;
			token: string;
		}>('/login', {
			email,
			password,
		});

		return {
			id: response.id || '',
			email: response.email || '',
			token: response.token || '',
		};
	}

	private async request<T>(
		path: string,
		payload?: Record<string, unknown>,
	): Promise<T> {
		const response = await fetch(`${this.appConfig.apiUrl}${path}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(payload),
		});

		return response.json();
	}
}
