import {
	AppConfig,
	type IAppConfig,
} from '@core/infrastructure/appConfig/AppConfig';
import { AppStorage } from '@core/infrastructure/appStorage/AppStorage';
import type { IAuthSerivce } from '@core/infrastructure/authService/types';

export class AuthService implements IAuthSerivce {
	static #instance: IAuthSerivce;

	public userId: string = '';
	public email: string = '';

	private constructor(
		private readonly authApi: AuthApi,
		private readonly authStorage: AuthStorage,
	) {}

	public static getInstance(): IAuthSerivce {
		if (!this.#instance) {
			const authStorage = AuthStorage.getInstance();
			const authApi = AuthApi.getInstance();

			this.#instance = new AuthService(authApi, authStorage);
		}

		return this.#instance;
	}

	public async signIn(
		email: string,
		password: string,
	): Promise<{
		email: string;
	}> {
		const result = await this.authApi.signIn(email, password);

		// this.userStorage.set({
		// 	email,
		// });

		return {
			email: result.email,
		};
	}

	public async logIn(
		email: string,
		password: string,
	): Promise<{
		id: string;
		email: string;
	}> {
		const result = await this.authApi.logIn(email, password);

		if (!result.id || !result.email) {
			throw new Error('User not found');
		}

		// this.userStorage.set({
		// 	id: result.id || '',
		// 	email: result.email || '',
		// });

		this.authStorage.set(result.token);

		return {
			id: result.id || '',
			email: result.email || '',
		};
	}
}

export class AuthStorage extends AppStorage<string> {
	static #instance: AuthStorage;

	private readonly STORAGE_ID: string = 'token';

	private constructor() {
		super();
	}

	public static getInstance(): AuthStorage {
		if (!this.#instance) {
			this.#instance = new AuthStorage();
		}

		return this.#instance;
	}

	public override set(payload: string): void {
		super.set(this.STORAGE_ID, payload);
	}

	public override get(): string | null {
		return super.get(this.STORAGE_ID);
	}
}

export class AuthApi {
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
		}>('/signin', {
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
