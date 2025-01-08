export interface IApiClient {
	request<TPayload, TResponse>(
		path: string,
		payload?: TPayload,
	): Promise<TResponse>;
}
