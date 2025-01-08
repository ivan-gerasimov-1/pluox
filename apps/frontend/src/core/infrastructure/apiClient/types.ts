export interface IApiClient {
	post<TPayload, TResponse>(
		path: string,
		payload?: TPayload,
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
