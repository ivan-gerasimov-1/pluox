import type { TRequest } from '#app/types';

import { EResponseCode } from '#app/enums';

export function readJsonBody<T>(request: TRequest): Promise<T> {
	return new Promise((resolve, reject) => {
		let body = '';

		request.on('data', (chunk) => {
			body += chunk.toString();
		});

		request.on('end', () => {
			try {
				let parsedBody = JSON.parse(body);

				resolve(parsedBody);
			} catch (error) {
				console.log(error);

				reject({
					code: EResponseCode.BAD_REQUEST,
					message: 'Bad request',
				});

				// sendJsonResponse(response, EResponseCode.BAD_REQUEST, {
				// 	message: 'Bad request',
				// });
			}
		});

		request.on('error', (error) => {
			console.log(error);

			reject({
				code: EResponseCode.INTERNAL_SERVER_ERROR,
				message: 'Internal server error',
			});
		});
	});
}
