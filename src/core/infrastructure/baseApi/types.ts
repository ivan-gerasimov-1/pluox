export interface IBaseApi {
	request<TPayload, TResponse>(
		path: string,
		payload?: TPayload,
	): Promise<TResponse>;
}
