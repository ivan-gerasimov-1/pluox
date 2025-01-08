import type { IEnvironment } from '@root/core/modules/settings/infrastructure/environment/types';
import {
	EHttpMethod,
	type IApiClient,
} from '@root/core/infrastructure/apiClient/types';
import type { ISessionService } from '@root/core/modules/identity/application/sessionService/types';

export class ApiClient implements IApiClient {
	constructor(
		private readonly environment: IEnvironment,
		private readonly sessionService: ISessionService,
	) {}

	private get authorizationHeader(): string {
		let authToken = this.sessionService.accessToken ?? '';

		return `Bearer ${authToken}`;
	}

	private get baseUrl(): string {
		return this.environment.apiUrl;
	}

	public async post<TPayload, TResponse>(
		path: string,
		payload?: TPayload,
	): Promise<TResponse> {
		return this.request(path, {
			method: EHttpMethod.POST,
			payload,
		});
	}

	private async request<TPayload, TResponse>(
		path: string,
		options: {
			method: EHttpMethod;
			payload?: TPayload;
		},
	): Promise<TResponse> {
		let body = JSON.stringify(options.payload ?? {});

		const responseRaw = await fetch(`${this.baseUrl}${path}`, {
			method: options.method,
			headers: {
				'Content-Type': 'application/json',
				Authorization: this.authorizationHeader,
			},
			body,
		});

		let response = await responseRaw.json();

		if (!responseRaw.ok) {
			return Promise.reject(response);
		}

		return response;
	}
}
