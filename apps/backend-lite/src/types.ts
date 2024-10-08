import type { IncomingMessage, ServerResponse } from 'node:http';

export type TRequest = IncomingMessage;
export type TResponse = ServerResponse<IncomingMessage> & {
	req: IncomingMessage;
};
