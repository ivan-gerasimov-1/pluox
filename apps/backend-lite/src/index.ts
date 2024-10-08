import { createServer } from 'node:http';
import { env as processEnv } from 'node:process';

import { generateId } from '#app/modules/crypto/id';
import {
	comparePasswordHash,
	createPasswordHash,
} from '#app/modules/crypto/passwordHash';
import { initializeDatabase } from '#app/modules/database/database';
import { createMail } from '#app/modules/email/createMail';
import { type Database } from 'better-sqlite3';
import { type Mail } from '#app/modules/email/mail';
import { createAppConfig, type TAppConfig } from '#app/modules/appConfig/index';
import { readJsonBody, sendJsonResponse } from '#app/router/index';
import { EResponseCode } from '#app/enums';
import type { TRequest, TResponse } from '#app/types';

type TId = string;
type TPassword = string;

type TUserCreateSchema = Pick<TUserSchema, 'id' | 'email' | 'password'>;

type TUserSchema = {
	id: TId;
	email: string;
	password: TPassword;
};

const routes: Record<
	string,
	(
		request: TRequest,
		response: TResponse,
		params?: {
			mail: Mail;
			appConfig: TAppConfig;
			db: Database;
		},
	) => {} | Promise<{}>
> = {
	'/': (request, response) => {
		return {
			message: 'Savee API',
		};
	},
	'/health': (request, response) => {
		return {
			message: 'OK',
			timestamp: new Date().toISOString(),
		};
	},
	'/mail/test': async (
		request,
		response,
		params: {
			mail: Mail;
			appConfig: TAppConfig;
		},
	) => {
		let body = await readJsonBody<{
			to: string;
			subject: string;
			message: string;
		}>(request);

		let mail = params.mail;
		let appConfig = params.appConfig;

		mail.send({
			from: appConfig.email.from,
			to: body.to,
			subject: body.subject,
			message: body.message,
		});

		return {
			message: 'OK',
			timestamp: new Date().toISOString(),
		};
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

		return {
			data: users,
		};
	},
	'/signin': async (
		request,
		response,
		params: {
			db: Database;
		},
	) => {
		let payload = await readJsonBody<{ email: string; password: string }>(
			request,
		);

		let db = params.db;
		let userReadSQLQuery =
			'SELECT id, email, password FROM users WHERE email = ?';

		let userReadStatement = db.prepare<[TPassword], TUserSchema>(
			userReadSQLQuery,
		);

		let user: TUserSchema;

		user = userReadStatement.get(payload.email);

		if (!user) {
			return {
				error: {
					code: EResponseCode.NOT_FOUND,
					message: 'Not Found',
				},
			};
		}

		let isPasswordMatch = comparePasswordHash(payload.password, user.password);

		if (!isPasswordMatch) {
			return {
				error: {
					code: EResponseCode.UNAUTHORIZED,
					message: 'Unauthorized',
				},
			};
		}

		return {
			id: user.id,
			email: user.email,
			password: user.password,
		};
	},
	'/signup': async (
		request,
		response,
		params: {
			db: Database;
			mail: Mail;
			appConfig: TAppConfig;
		},
	) => {
		let database = params.db;
		let mail = params.mail;
		let appConfig = params.appConfig;

		let payload = await readJsonBody<{ email: string; password: string }>(
			request,
		);

		let userReadSQLQuery =
			'SELECT id, email, password FROM users WHERE email = ?';
		const userReadStatement = database.prepare<[string], TUserSchema>(
			userReadSQLQuery,
		);

		let existingUser = userReadStatement.get(payload.email);

		if (existingUser) {
			return {
				error: {
					code: EResponseCode.CONFLICT,
					message: 'User with this name already exists',
				},
			};
		}

		let userCreateSqlQuery =
			'INSERT INTO users (id, email, password) VALUES (:id, :email, :password)';
		const userCreateStatement =
			database.prepare<[TUserCreateSchema]>(userCreateSqlQuery);

		userCreateStatement.run({
			id: generateId('usr'),
			email: payload.email,
			password: createPasswordHash(payload.password),
		});

		let user = userReadStatement.get(payload.email);

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

		return {
			email: user.email,
		};
	},
	notFound: (request, response) => {
		return {
			error: {
				code: EResponseCode.NOT_FOUND,
				message: 'Requested endpoint is not found',
			},
		};
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

	const server = createServer(async (request, response) => {
		try {
			let routeHander = routes[request.url];

			if (!routeHander) {
				routes.notFound(request, response);
				return;
			}

			let result = await routeHander(request, response, {
				db,
				mail,
				appConfig,
			});

			// @ts-expect-error
			if (result.error) {
				console.log(
					// @ts-expect-error
					result.error,
				);

				sendJsonResponse(
					response,
					// @ts-expect-error
					result.error?.code,
					{
						// @ts-expect-error
						message: result.error?.message,
					},
				);

				return;
			}

			let {
				// @ts-expect-error
				meta,
				...responsePayload
			} = result;

			sendJsonResponse(
				response,
				meta?.code || EResponseCode.OK,
				responsePayload,
			);
		} catch (error) {
			console.log(error);

			if (!error.code) {
				sendJsonResponse(response, EResponseCode.INTERNAL_SERVER_ERROR, {
					message: 'Internal server error',
				});
			}

			sendJsonResponse(response, error.code, {
				message: error.message,
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
