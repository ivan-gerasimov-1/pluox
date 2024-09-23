import { createServer } from 'node:http';

import { sendJsonResponse } from '#app/utils/sendJsonResponse';
import { config } from '#app/config';

const enum EResponseCode {
	OK = 200,
	NOT_FOUND = 404,
}

const routes = {
	'/': (request, response) => {
		sendJsonResponse(response, EResponseCode.OK, {
			message: 'Hello, World!',
		});
	},
	'/health': (request, response) => {
		sendJsonResponse(response, EResponseCode.OK, {
			message: 'OK',
		});
	},
	notFound: (request, response) => {
		sendJsonResponse(response, EResponseCode.NOT_FOUND, {
			message: 'Not found',
		});
	},
};

function main() {
	const server = createServer((request, response) => {
		let routeHander = routes[request.url];

		if (!routeHander) {
			routes.notFound(request, response);
			return;
		}

		routeHander(request, response);
	});

	server
		.listen(
			{
				port: config.port,
			},
			() => {
				console.log(`Server is running on port ${config.port}`);
			},
		)
		.on('error', (error) => {
			if (error.code === 'EADDRINUSE') {
				console.error('[Error] Address in use:', config.port);
				server.close();
			}
		});

	['SIGINT', 'SIGTERM', 'SIGQUIT'].forEach((signal) =>
		process.on(signal, (signalName) => {
			console.log('Server is shutting down due to:', signalName);
			server.close();
			process.exit();
		}),
	);
}

main();
