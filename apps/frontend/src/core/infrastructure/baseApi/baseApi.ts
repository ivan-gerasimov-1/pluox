import type { TEnvironment } from '@root/core/modules/settings/infrastructure/config';
import type { IAuthDataSource } from '@root/core/modules/identity/infrastructure/authDataSource/types';
import type { IBaseApi } from '@core/infrastructure/baseApi/types';

export class BaseApi implements IBaseApi {
	constructor(
		private readonly environment: TEnvironment,
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

	private get baseUrl(): string {
		return this.environment.apiUrl;
	}

	public async request<TPayload, TResponse>(
		path: string,
		payload?: TPayload,
	): Promise<TResponse> {
		const responseRaw = await fetch(`${this.baseUrl}${path}`, {
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
