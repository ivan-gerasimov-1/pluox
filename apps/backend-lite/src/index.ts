import { createServer } from 'node:http';

import { initializeDatabase } from '#app/modules/database/database';
import { sendJsonResponse } from '#app/utils/sendJsonResponse';
import { config } from '#app/config';
import { type Database } from 'better-sqlite3';

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
	'/users': (
		request,
		response,
		params: {
			db: Database;
		},
	) => {
		let users = params.db.prepare('SELECT * FROM users').all();

		sendJsonResponse(response, EResponseCode.OK, {
			data: users,
		});
	},
	'/signup': (
		request,
		response,
		params: {
			db: Database;
		},
	) => {
		let body = '';

		request.on('data', (chunk) => {
			body += chunk.toString();
			console.log(body);
		});

		request.on('end', () => {
			let payload;

			try {
				payload = JSON.parse(body);
			} catch (error) {
				console.log(error);
			}

			const stmt = params.db.prepare(
				'INSERT INTO users (username, password) VALUES (:username, :password)',
			);

			console.log(payload);
			let result;
			try {
				result = stmt.run({
					username: payload.username,
					password: payload.password,
				});
			} catch (error) {
				console.log(error);
			}

			console.log(result);

			function handle() {
				// if (error) {
				// 	sendJsonResponse(response, EResponseCode.NOT_FOUND, {
				// 		message: 'Signup sfailed',
				// 	});
				// 	return;
				// }

				sendJsonResponse(response, EResponseCode.OK, {
					data: {
						id: result.lastInsertRowid,
						username: payload.username,
					},
				});
			}

			handle();
		});
	},
	notFound: (request, response) => {
		sendJsonResponse(response, EResponseCode.NOT_FOUND, {
			message: 'Not found',
		});
	},
};

function main() {
	let db = initializeDatabase();

	const server = createServer((request, response) => {
		let routeHander = routes[request.url];

		if (!routeHander) {
			routes.notFound(request, response);
			return;
		}

		routeHander(request, response, {
			db,
		});
	});

	server
		.listen(
			{
				host: config.host,
				port: config.port,
			},
			() => {
				console.log(
					`Server is running on port ${config.port}, host ${config.host}`,
				);
			},
		)
		.on('error', (error) => {
			if (error.code === 'EADDRINUSE') {
				console.error('[Error] Address in use:', config.port);
				db.close();
				server.close();
			}
		});

	['SIGINT', 'SIGTERM'].forEach((signal) =>
		process.on(signal, (...signalName) => {
			console.log('Server is shutting down due to:', signalName);

			server.close(() => {
				console.log('Server closed');

				db.close();
				console.log('Database closed');

				process.exit(0);
			});
		}),
	);
}

main();
