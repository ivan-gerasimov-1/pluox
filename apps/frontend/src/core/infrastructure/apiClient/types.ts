import type { TValueOf } from '@root/core/types';

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
	readonly authorizationHeader: string | null;
}

export type THttpHeaders = {
	[EHttpHeader.CONTENT_TYPE]: 'application/json';
	[EHttpHeader.AUTHORIZATION]?: string;
};

export const EHttpMethod = {
	GET: 'GET',
	POST: 'POST',
	PUT: 'PUT',
	DELETE: 'DELETE',
} as const;

export type THttpMethod = TValueOf<typeof EHttpMethod>;

export const EHttpHeader = {
	CONTENT_TYPE: 'Content-Type',
	AUTHORIZATION: 'Authorization',
} as const;

export type THttpHeader = TValueOf<typeof EHttpHeader>;
