import { createServer } from 'node:http';
import { env as processEnv } from 'node:process';

import { generateId } from '#app/modules/crypto/id';
import {
	comparePasswordHash,
	createPasswordHash,
} from '#app/modules/crypto/passwordHash';
import { initializeDatabase } from '#app/modules/database/database';
import { createMail } from '#app/modules/email/createMail';
import { sendJsonResponse } from '#app/utils/sendJsonResponse';
import { type Database } from 'better-sqlite3';
import { type Mail } from '#app/modules/email/mail';
import { createAppConfig, type TAppConfig } from '#app/modules/appConfig/index';

const enum EResponseCode {
	OK = 200,
	BAD_REQUEST = 400,
	UNAUTHORIZED = 401,
	NOT_FOUND = 404,
	CONFLICT = 409,
	INTERNAL_SERVER_ERROR = 500,
}
type TId = string;
type TPassword = string;

type TUserCreateSchema = Pick<TUserSchema, 'id' | 'email' | 'password'>;

type TUserSchema = {
	id: TId;
	email: string;
	password: TPassword;
};

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
	'/mail/test': (
		request,
		response,
		params: {
			mail: Mail;
			appConfig: TAppConfig;
		},
	) => {
		readJsonBody(request, response, (body) => {
			let mail = params.mail;
			let appConfig = params.appConfig;

			mail.send({
				from: appConfig.email.from,
				to: body.to,
				subject: body.subject,
				message: body.message,
			});

			sendJsonResponse(response, EResponseCode.OK, {
				message: 'OK',
				timestamp: new Date().toISOString(),
			});
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
			SELECT id, email FROM users
		`;
		let usersSqlStatement = params.db.prepare<
			[],
			{
				id: string;
				email: string;
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
			let db = params.db;
			let userReadSQLQuery =
				'SELECT id, email, password FROM users WHERE email = ?';

			let userReadStatement = db.prepare<[TPassword], TUserSchema>(
				userReadSQLQuery,
			);

			let user: TUserSchema;

			try {
				user = userReadStatement.get(payload.email);
			} catch (error) {
				console.log(error);
			}

			if (!user) {
				sendJsonResponse(response, EResponseCode.NOT_FOUND, {
					message: 'Not Found',
				});

				return;
			}

			let isPasswordMatch = comparePasswordHash(
				payload.password,
				user.password,
			);

			if (!isPasswordMatch) {
				sendJsonResponse(response, EResponseCode.UNAUTHORIZED, {
					message: 'Unauthorized',
				});

				return;
			}

			sendJsonResponse(response, EResponseCode.OK, {
				data: {
					id: user.id,
					email: user.email,
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
			mail: Mail;
			appConfig: TAppConfig;
		},
	) => {
		readJsonBody(request, response, (payload) => {
			let database = params.db;
			let mail = params.mail;
			let appConfig = params.appConfig;

			let userReadSQLQuery =
				'SELECT id, email, password FROM users WHERE email = ?';
			const userReadStatement = database.prepare<[string], TUserSchema>(
				userReadSQLQuery,
			);

			try {
				let user = userReadStatement.get(payload.email);

				if (user) {
					sendJsonResponse(response, EResponseCode.CONFLICT, {
						message: 'User with this name already exists',
					});

					return;
				}
			} catch (error) {
				console.log(error);
			}

			let userCreateSqlQuery =
				'INSERT INTO users (id, email, password) VALUES (:id, :email, :password)';
			const userCreateStatement =
				database.prepare<[TUserCreateSchema]>(userCreateSqlQuery);

			let user: TUserSchema;
			let newUser: TUserCreateSchema = {
				id: generateId('usr'),
				email: payload.email,
				password: createPasswordHash(payload.password),
			};

			try {
				userCreateStatement.run(newUser);

				user = userReadStatement.get(payload.email);

				mail.send({
					from: appConfig.email.from,
					to: payload.email,
					subject: 'Добро пожаловать в Savee',
					message: `
						<html>
				 					<body>
				 							<h1>Добро пожаловать!</h1>
				 							<p>Пожалуйста, подтвердите свою регистрацию, нажав на ссылку ниже:</p>
				 							<a href="https://savee.app/auth/confirm?token=abc123">Подтвердить</a>
				 					</body>
				 			</html>
					`,
				});
			} catch (error) {
				console.log(error);
			}

			sendJsonResponse(response, EResponseCode.OK, {
				data: {
					email: user.email,
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
	let appConfig = createAppConfig(processEnv);
	let db = initializeDatabase();
	let mail = createMail({
		host: appConfig.email.host,
		port: appConfig.email.port,
		auth: {
			user: appConfig.email.auth.user,
			password: appConfig.email.auth.password,
		},
		provider: appConfig.email.provider,
	});

	const server = createServer((request, response) => {
		try {
			let routeHander = routes[request.url];

			if (!routeHander) {
				routes.notFound(request, response);
				return;
			}

			routeHander(request, response, {
				db,
				mail,
				appConfig,
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
				host: appConfig.host,
				port: appConfig.port,
			},
			() => {
				console.log(
					`Server is running on port ${appConfig.port}, host ${appConfig.host}`,
				);
			},
		)
		.on('error', (error) => {
			if (error.code === 'EADDRINUSE') {
				console.error('[Error] Address in use:', appConfig.port);
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
