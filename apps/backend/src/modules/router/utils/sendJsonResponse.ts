import type { TResponse } from '#app/types';

export function sendJsonResponse(
	response: TResponse,
	statusCode: number,
	payload: Record<string, unknown>,
): void {
	let responsePayload = JSON.stringify(payload);

	response.statusCode = statusCode;
	response.setHeader('Content-Type', 'application/json');
	response.end(responsePayload);
}
