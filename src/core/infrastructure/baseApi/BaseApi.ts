import {
	AppConfig,
	type IAppConfig,
} from '@core/infrastructure/appConfig/AppConfig';
import { AuthStorage } from '@core/infrastructure/authService/AuthService';
import { type IBaseApi } from '@core/infrastructure/baseApi/types';

export class BaseApi implements IBaseApi {
	static #instance: IBaseApi;

	private constructor(
		private readonly appConfig: IAppConfig,
		private readonly authStorage: AuthStorage,
	) {}

	public static getInstance(): IBaseApi {
		if (!this.#instance) {
			const authStorage = AuthStorage.getInstance();
			const appConfig = AppConfig.getInstance();

			this.#instance = new BaseApi(appConfig, authStorage);
		}

		return this.#instance;
	}

	private get authToken(): string {
		const token = this.authStorage.get();

		if (!token) {
			return '';
		}

		return token;
	}

	public async request<TPayload, TResponse>(
		path: string,
		payload?: TPayload,
	): Promise<TResponse> {
		const response = await fetch(`${this.appConfig.apiUrl}${path}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${this.authToken}`,
			},
			body: JSON.stringify(payload),
		});

		if (!response.ok) {
			return Promise.reject(response.json());
		}

		return response.json();
	}
}
