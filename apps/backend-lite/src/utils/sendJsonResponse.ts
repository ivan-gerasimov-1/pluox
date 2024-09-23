export function sendJsonResponse(response, statusCode, payload): void {
	response.statusCode = statusCode;

	response.setHeader('Content-Type', 'application/json');
	response.end(JSON.stringify(payload));
}
