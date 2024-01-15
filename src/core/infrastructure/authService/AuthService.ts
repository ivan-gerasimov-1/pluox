import {
	AppConfig,
	type IAppConfig,
} from '@core/infrastructure/appConfig/AppConfig';
import type { IAuthSerivce } from '@core/infrastructure/authService/types';

export class AuthService implements IAuthSerivce {
	static #instance: IAuthSerivce;

	public userId: string = '';
	public email: string = '';

	private constructor(private readonly appConfig: IAppConfig) {}

	public static getInstance(): IAuthSerivce {
		if (!this.#instance) {
			const appConfig = AppConfig.getInstance();

			this.#instance = new AuthService(appConfig);
		}

		return this.#instance;
	}

	public async signIn(
		email: string,
		password: string,
	): Promise<{
		email: string;
	}> {
		const response = await this.request('/signin', {
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
	}> {
		const response = await this.request('/login', {
			email,
			password,
		});

		return {
			id: response.id || '',
			email: response.email || '',
		};
	}

	private async request(
		path: string,
		payload?: Record<string, unknown>,
	): Promise<{
		email: string;
		id?: string;
		token?: string;
	}> {
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
