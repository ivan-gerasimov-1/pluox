export interface IApiClient {
	get<TResponse>(
		path: string,
		options?: {
			abortSignal?: AbortSignal;
		},
	): Promise<TResponse>;
	post<TPayload, TResponse>(
		path: string,
		payload?: TPayload,
		options?: {
			abortSignal?: AbortSignal;
		},
	): Promise<TResponse>;
}

export interface IApiClientConfigProvider {
	readonly baseUrl: string;
	readonly authorizationHeader: string;
}

export type THttpHeaders = {
	[EHttpHeader.CONTENT_TYPE]: 'application/json';
	[EHttpHeader.AUTHORIZATION]?: string;
};

export const enum EHttpMethod {
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT',
	DELETE = 'DELETE',
}

export const enum EHttpHeader {
	CONTENT_TYPE = 'Content-Type',
	AUTHORIZATION = 'Authorization',
}
