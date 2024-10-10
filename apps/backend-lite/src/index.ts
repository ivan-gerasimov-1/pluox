import { createServer } from 'node:http';
import { env as processEnv } from 'node:process';

import { type Database } from 'better-sqlite3';

import { EResponseCode } from '#app/enums';
import { createAppConfig, type TAppConfig } from '#app/modules/appConfig/index';
import { generateId } from '#app/modules/crypto/id';
import {
	comparePasswordHash,
	createPasswordHash,
} from '#app/modules/crypto/passwordHash';
import { initializeDatabase } from '#app/modules/database/database';
import { createMail } from '#app/modules/email/createMail';
import { type Mail } from '#app/modules/email/mail';
import {
	Router,
	readJsonBody,
	sendJsonResponse,
} from '#app/modules/router/index';
import type { TPassword, TRequest, TResponse } from '#app/types';
import { createEmailTemplate } from '#app/modules/email/createEmailTemplate';
import { UsersRepository } from '#app/modules/users/usersRepository';
import type { TUserCreateSchema, TUserSchema } from '#app/modules/users/types';
import { Session } from '#app/modules/session/session';
import { checkAuthentication } from '#app/modules/authentication/checkAuthentication';

function getIndex() {
	return {
		message: 'Savee API',
	};
}

function getHealth() {
	return {
		message: 'OK',
		timestamp: new Date().toISOString(),
	};
}

async function postMailTest(
	params,
	dependencies: {
		mail: Mail;
		appConfig: TAppConfig;
	},
	request: TRequest,
) {
	let body = await readJsonBody<{
		to: string;
		subject: string;
		message: string;
	}>(request);

	let mail = dependencies.mail;
	let appConfig = dependencies.appConfig;

	mail.send({
		from: appConfig.email.from,
		to: body.to,
		subject: body.subject,
		message: createEmailTemplate({
			title: body.subject,
			heading: 'Добро пожаловать!',
			body: `
				<p>Пожалуйста, подтвердите свою регистрацию, нажав на ссылку ниже:</p>
				<a href="https://savee.app/auth/confirm?token=abc123">Подтвердить</a>
			`,
		}),
	});

	return {
		message: 'OK',
		timestamp: new Date().toISOString(),
	};
}

async function getUsers(
	params: never,
	dependencies: {
		usersRepository: UsersRepository;
	},
) {
	let usersRepository = dependencies.usersRepository;

	let users = await usersRepository.getUsers();

	return {
		data: users,
	};
}

async function getUser(
	params: {
		id: string;
	},
	dependencies: {
		usersRepository: UsersRepository;
	},
) {
	let usersRepository = dependencies.usersRepository;
	let userId = params.id;

	let user = await usersRepository.getUser(userId);

	if (!user) {
		return {
			error: {
				code: EResponseCode.NOT_FOUND,
				message: 'User not found',
			},
		};
	}

	return {
		id: user.id,
		email: user.email,
	};
}

async function postSignIn(
	params,
	dependencies: {
		usersRepository: UsersRepository;
		session: Session;
	},
	request: TRequest,
	response: TResponse,
) {
	let usersRepository = dependencies.usersRepository;
	let session = dependencies.session;

	let payload = await readJsonBody<{ email: string; password: string }>(
		request,
	);

	let user: TUserSchema = await usersRepository.getUserByEmail(payload.email);

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

	let sessionId = session.create();
	response.setHeader('Set-Cookie', `sessionId=${sessionId}; HttpOnly; Path=/`);

	return {
		id: user.id,
		email: user.email,
	};
}

async function postSignUp(
	params,
	dependencies: {
		db: Database;
		mail: Mail;
		appConfig: TAppConfig;
	},
	request: TRequest,
) {
	let database = dependencies.db;
	let mail = dependencies.mail;
	let appConfig = dependencies.appConfig;

	let payload = await readJsonBody<{ email: string; password: TPassword }>(
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
		message: createEmailTemplate({
			title: 'Добро пожаловать в Savee',
			heading: 'Добро пожаловать!',
			body: `
				<p>Пожалуйста, подтвердите свою регистрацию, нажав на ссылку ниже:</p>
				<a href="https://savee.app/auth/confirm?token=abc123">Подтвердить</a>
			`,
		}),
	});

	return {
		email: user.email,
	};
}

function notFoundController() {
	return {
		error: {
			code: EResponseCode.NOT_FOUND,
			message: 'Requested endpoint is not found',
		},
	};
}

function main() {
	let appConfig = createAppConfig(processEnv);
	let db = initializeDatabase({
		filename: appConfig.db.filename,
	});
	let mail = createMail({
		host: appConfig.email.host,
		port: appConfig.email.port,
		auth: {
			user: appConfig.email.auth.user,
			password: appConfig.email.auth.password,
		},
		provider: appConfig.email.provider,
	});
	let session = new Session();

	let usersRepository = new UsersRepository(db);

	let router = new Router();

	router
		.addRoute('/', getIndex, {
			secure: true,
		})
		.addRoute('/health', getHealth)
		.addRoute('/mail/test', postMailTest, {
			secure: true,
		})
		.addRoute('/users', getUsers, {
			secure: true,
		})
		.addRoute('/users/:id', getUser)
		.addRoute('/signin', postSignIn)
		.addRoute('/signup', postSignUp);

	const server = createServer(async (request, response) => {
		try {
			/**
			 * @todo Remove queryParams from url
			 */
			let match = router.match(request.url);

			let canAccess = match?.options?.secure
				? checkAuthentication(request, session, appConfig)
				: true;

			if (!canAccess) {
				let error = {
					code: EResponseCode.UNAUTHORIZED,
					message: 'Unauthorized',
				};

				throw error;
			}

			let dependencies = {
				db,
				mail,
				appConfig,
				usersRepository,
				session,
			};

			let routeHander =
				match?.handler<
					Record<string, any> & {
						error?: Record<string, any>;
						meta?: Record<string, any>;
					}
				> || notFoundController;

			let result = await routeHander(
				match?.params,
				dependencies,
				request,
				response,
			);

			if (result.error) {
				console.log(result.error);

				sendJsonResponse(response, result.error?.code, {
					message: result.error?.message,
				});

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
