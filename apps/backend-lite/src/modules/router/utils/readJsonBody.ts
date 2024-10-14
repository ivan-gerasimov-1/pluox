import type { TRequest } from '#app/types';

import { EResponseCode } from '#app/enums';
import { ERequestEvent } from '#app/modules/router/enums';

export function readJsonBody<T>(request: TRequest): Promise<T> {
	return new Promise((resolve, reject) => {
		let body = '';

		request.on(ERequestEvent.DATA, (chunk) => {
			body += chunk.toString();
		});

		request.on(ERequestEvent.END, () => {
			try {
				let parsedBody = JSON.parse(body);

				resolve(parsedBody);
			} catch (error) {
				reject({
					code: EResponseCode.BAD_REQUEST,
					message: 'Invalid JSON',
				});
			}
		});

		request.on(ERequestEvent.ERROR, reject);
	});
}
