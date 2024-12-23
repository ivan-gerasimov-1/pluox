import type { IAppConfig } from '@core/infrastructure/appConfig/AppConfig';
import type { IAuthDataSource } from '@root/core/infrastructure/authDataSource/types';
import type { IBaseApi } from '@core/infrastructure/baseApi/types';

export class BaseApi implements IBaseApi {
	constructor(
		private readonly appConfig: IAppConfig,
		private readonly authDataSource: IAuthDataSource,
	) {}

	private get authToken(): string {
		const token = this.authDataSource.read();

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
