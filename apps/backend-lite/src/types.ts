import type { IncomingMessage, ServerResponse } from 'node:http';

export type TId = string;
export type TPassword = string;

export type TRequest = IncomingMessage;
export type TResponse = ServerResponse<IncomingMessage> & {
	req: IncomingMessage;
};
