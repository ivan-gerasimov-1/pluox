import { getGlobalContainer } from '@root/diContainer';

import type { IAppConfig } from '@core/infrastructure/appConfig/AppConfig';
import type { IAuthStorage } from '@core/infrastructure/authStorage/types';
import type { IBaseApi } from '@core/infrastructure/baseApi/types';

import { EServiceToken } from '@modules/serviceContainer/types';

export class BaseApi implements IBaseApi {
	static #instance: IBaseApi;

	private constructor(
		private readonly appConfig: IAppConfig,
		private readonly authStorage: IAuthStorage,
	) {}

	public static getInstance(): IBaseApi {
		if (!this.#instance) {
			let globalContainer = getGlobalContainer();

			let authStorage = globalContainer.get(EServiceToken.AUTH_STORAGE);
			let appConfig = globalContainer.get(EServiceToken.APP_CONFIG);

			this.#instance = new BaseApi(appConfig, authStorage);
		}

		return this.#instance;
	}

	private get authToken(): string {
		const token = this.authStorage.read();

		if (!token) {
			return '';
		}

		return token;
	}

	private get authorizationHeader(): string {
		return `Bearer ${this.authToken}`;
	}

	public async request<TPayload, TResponse>(
		path: string,
		payload?: TPayload,
	): Promise<TResponse> {
		const responseRaw = await fetch(`${this.appConfig.apiUrl}${path}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: this.authorizationHeader,
			},
			body: JSON.stringify(payload),
		});

		let response = await responseRaw.json();

		if (!responseRaw.ok) {
			return Promise.reject(response);
		}

		return response;
	}
}
