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
		userId: string;
		email: string;
	}> {
		const response = await this.request({
			email,
			password,
		});

		return {
			userId: '',
			email: response.email,
		};
	}

	private async request(payload: Record<string, unknown>): Promise<{
		email: string;
	}> {
		const response = await fetch(`${this.appConfig.apiUrl}/signup`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(payload),
		});

		return response.json();
	}
}
