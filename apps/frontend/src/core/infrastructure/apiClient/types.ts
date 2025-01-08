export interface IApiClient {
	request<TPayload, TResponse>(
		path: string,
		payload?: TPayload,
	): Promise<TResponse>;
}

export const enum EHttpMethod {
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT',
	DELETE = 'DELETE',
}
