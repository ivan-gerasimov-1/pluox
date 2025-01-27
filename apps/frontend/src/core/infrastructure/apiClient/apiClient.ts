import {
	EHttpHeader,
	EHttpMethod,
	type IApiClient,
	type IApiClientConfigProvider,
	type THttpHeaders,
} from '@root/core/infrastructure/apiClient/types';

export class ApiClient implements IApiClient {
	constructor(private readonly configProvider: IApiClientConfigProvider) {}

	private get authorizationHeader(): string {
		return this.configProvider.authorizationHeader;
	}

	private get baseUrl(): string {
		return this.configProvider.baseUrl;
	}

	public async get<TResponse>(
		path: string,
		options?: {
			abortSignal?: AbortSignal;
		},
	): Promise<TResponse> {
		return this.request(path, {
			method: EHttpMethod.GET,
			abortSignal: options?.abortSignal,
		});
	}

	public async post<TPayload, TResponse>(
		path: string,
		payload?: TPayload,
		options?: {
			abortSignal?: AbortSignal;
		},
	): Promise<TResponse> {
		return this.request(path, {
			method: EHttpMethod.POST,
			payload,
			abortSignal: options?.abortSignal,
		});
	}

	private async request<TPayload, TResponse>(
		path: string,
		options: {
			method: EHttpMethod;
			payload?: TPayload;
			abortSignal?: AbortSignal;
		},
	): Promise<TResponse> {
		let body = JSON.stringify(options.payload ?? {});
		let headers = this.createHeaders();

		let responseRaw = await fetch(`${this.baseUrl}${path}`, {
			method: options.method,
			headers,
			body,
			credentials: 'include',
			signal: options.abortSignal,
		});

		let response = await responseRaw.json();

		if (!responseRaw.ok) {
			return Promise.reject(response);
		}

		return response;
	}

	private createHeaders(): THttpHeaders {
		let headers: THttpHeaders = {
			[EHttpHeader.CONTENT_TYPE]: 'application/json',
		};

		if (this.authorizationHeader) {
			headers[EHttpHeader.AUTHORIZATION] = this.authorizationHeader;
		}

		return headers;
	}
}
