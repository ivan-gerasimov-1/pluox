import { createServer } from 'node:http';
import { scryptSync as scrypt, randomBytes } from 'node:crypto';

import { initializeDatabase } from '#app/modules/database/database';
import { sendJsonResponse } from '#app/utils/sendJsonResponse';
import { config } from '#app/config';
import { type Database } from 'better-sqlite3';

const enum EResponseCode {
	OK = 200,
	BAD_REQUEST = 400,
	UNAUTHORIZED = 401,
	NOT_FOUND = 404,
	CONFLICT = 409,
	INTERNAL_SERVER_ERROR = 500,
}

const routes = {
	'/': (request, response) => {
		sendJsonResponse(response, EResponseCode.OK, {
			message: 'Savee API',
		});
	},
	'/health': (request, response) => {
		sendJsonResponse(response, EResponseCode.OK, {
			message: 'OK',
			timestamp: new Date().toISOString(),
		});
	},
	'/users': (
		request,
		response,
		params: {
			db: Database;
		},
	) => {
		let usersSqlQuery = `
			SELECT id, username FROM users
		`;
		let usersSqlStatement = params.db.prepare<
			[],
			{
				id: string;
				username: string;
			}
		>(usersSqlQuery);

		let users = usersSqlStatement.all();

		sendJsonResponse(response, EResponseCode.OK, {
			data: users,
		});
	},
	'/signin': (
		request,
		response,
		params: {
			db: Database;
		},
	) => {
		readJsonBody(request, response, (payload) => {
			const statement = params.db.prepare(
				'SELECT id, username, password FROM users WHERE username = ?',
			);

			let user;

			try {
				user = statement.get(payload.username);
			} catch (error) {
				console.log(error);
			}

			if (!user) {
				sendJsonResponse(response, EResponseCode.NOT_FOUND, {
					message: 'Not Found',
				});

				return;
			}

			let [salt, key] = user.password.split(':');
			let passwordHash = scrypt(payload.password, salt, 64).toString('hex');

			if (key !== passwordHash) {
				sendJsonResponse(response, EResponseCode.UNAUTHORIZED, {
					message: 'Unauthorized',
				});

				return;
			}

			sendJsonResponse(response, EResponseCode.OK, {
				data: {
					id: user.id,
					username: user.username,
					password: user.password,
				},
			});
		});
	},
	'/signup': (
		request,
		response,
		params: {
			db: Database;
		},
	) => {
		readJsonBody(request, response, (payload) => {
			let database = params.db;

			let userGetSqlQuery =
				'SELECT username, password FROM users WHERE username = ?';
			const userGetStatement = database.prepare(userGetSqlQuery);

			try {
				let user = userGetStatement.get(payload.username);

				if (user) {
					sendJsonResponse(response, EResponseCode.CONFLICT, {
						message: 'User with this name already exists',
					});

					return;
				}
			} catch (error) {
				console.log(error);
			}

			let userAddSqlQuery =
				'INSERT INTO users (id, username, password) VALUES (:id, :username, :password)';
			const userAddStatement = database.prepare(userAddSqlQuery);

			let newUser;

			let salt = randomBytes(16).toString('hex');
			let passwordHash = scrypt(payload.password, salt, 64).toString('hex');
			let passwordWithSalt = `${salt}:${passwordHash}`;

			try {
				newUser = userAddStatement.run({
					id: generateId('usr'),
					username: payload.username,
					password: passwordWithSalt,
				});
			} catch (error) {
				console.log(error);
			}

			sendJsonResponse(response, EResponseCode.OK, {
				data: {
					username: newUser.username,
				},
			});
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
		try {
			let routeHander = routes[request.url];

			if (!routeHander) {
				routes.notFound(request, response);
				return;
			}

			routeHander(request, response, {
				db,
			});
		} catch (error) {
			console.log(error);

			sendJsonResponse(response, EResponseCode.INTERNAL_SERVER_ERROR, {
				message: 'Internal server error',
			});
		}
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

function readJsonBody(request, response, callback) {
	let body = '';

	request.on('data', (chunk) => {
		body += chunk.toString();
	});

	request.on('end', () => {
		try {
			let parsedBody = JSON.parse(body);

			callback(parsedBody);
		} catch (error) {
			console.log(error);

			sendJsonResponse(response, EResponseCode.BAD_REQUEST, {
				message: 'Bad request',
			});
		}
	});
}

function generateId(prefix: string = 'id', length: number = 7): string {
	return `${prefix}${randomBytes(length).toString('hex')}`;
}
