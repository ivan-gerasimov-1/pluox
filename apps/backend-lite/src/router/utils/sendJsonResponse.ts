export function sendJsonResponse(response, statusCode, payload): void {
	let responsePayload = JSON.stringify(payload);

	response.statusCode = statusCode;
	response.setHeader('Content-Type', 'application/json');
	response.end(responsePayload);
}
