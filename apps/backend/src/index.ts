import { createServer, type Server } from 'node:http';
import { env as processEnv } from 'node:process';
import * as assert from 'node:assert';

import { type Database } from 'better-sqlite3';

import { EProcessEvent, EResponseCode } from '#app/enums';
import type { TPassword, TRequest } from '#app/types';
import { createAppConfig, type TAppConfig } from '#app/modules/appConfig/index';
import {
	comparePasswordHash,
	createPasswordHash,
	generateId,
} from '#app/modules/crypto/index';
import { initializeDatabase } from '#app/modules/database/database';
import {
	createMail,
	createEmailTemplate,
	type Mail,
} from '#app/modules/email/index';
import {
	Router,
	readJsonBody,
	sendJsonResponse,
} from '#app/modules/router/index';
import { UsersRepository } from '#app/modules/users/usersRepository';
import { Session, type ISession } from '#app/modules/session/index';
import { checkAuthentication } from '#app/modules/authentication/checkAuthentication';
import { createCookie, type ICookie } from '#app/modules/cookie/index';
import {
	ExpensesRepository,
	type TExpenseCreateDTO,
} from '#app/modules/expenses/index';

export const enum EHttpMethod {
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT',
	DELETE = 'DELETE',
}

export type TEndpointControllerDependencies = {
	db: Database;
	mail: Mail;
	appConfig: TAppConfig;
	session: ISession;
	usersRepository: UsersRepository;
	expenesesRepository: ExpensesRepository;
};

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
	{
		body,
	}: {
		body: {
			to: string;
			subject: string;
			message: string;
		};
	},
	{ mail, appConfig }: TEndpointControllerDependencies,
) {
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
	{ usersRepository }: TEndpointControllerDependencies,
) {
	let users = await usersRepository.getUsers();

	return {
		data: users,
	};
}

async function getUser(
	params: {
		pathParams: {
			id: string;
		};
	},
	{ usersRepository }: TEndpointControllerDependencies,
) {
	let userId = params.pathParams.id;

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

async function expensesController(
	{
		body,
		auth,
	}: {
		body: TExpenseCreateDTO;
		auth: {
			userId: string;
		};
	},
	{ expenesesRepository }: TEndpointControllerDependencies,
	request: TRequest,
) {
	if (request.method === EHttpMethod.POST) {
		let userId = auth.userId;

		await expenesesRepository.createExpense({
			id: body.id,

			userId,

			createdAt: body.createdAt,
			modifiedAt: body.modifiedAt,

			amount: body.amount,
			currency: body.currency,
			comment: body.comment,
			category: body.category,
			date: body.date,
		});

		return {
			status: 'Success',
		};
	}

	if (request.method === EHttpMethod.GET) {
		let expenses = await expenesesRepository.getExpenses();

		return {
			data: expenses,
		};
	}

	return {
		error: {
			code: EResponseCode.NOT_FOUND,
			message: 'Not Implemented',
		},
	};
}

async function postSignIn(
	{
		body,
		cookie,
	}: {
		body: { email: string; password: string };
		cookie: ICookie;
	},
	{ usersRepository, session }: TEndpointControllerDependencies,
) {
	let user = await usersRepository.getUserByEmail(body.email);

	if (!user) {
		return {
			error: {
				code: EResponseCode.NOT_FOUND,
				message: 'Not Found',
			},
		};
	}

	let isPasswordMatch = comparePasswordHash(body.password, user.password);

	if (!isPasswordMatch) {
		return {
			error: {
				code: EResponseCode.UNAUTHORIZED,
				message: 'Unauthorized',
			},
		};
	}

	cookie.set(
		'sessionId',
		session.create({
			userId: user.id,
		}),
		{
			httpOnly: true,
			path: '/',
		},
	);

	return {
		id: user.id,
		email: user.email,
	};
}

async function postSignUp(
	{
		body,
	}: {
		body: { email: string; password: TPassword };
	},
	{ mail, appConfig, usersRepository }: TEndpointControllerDependencies,
) {
	let existingUser = await usersRepository.getUserByEmail(body.email);

	if (existingUser) {
		return {
			error: {
				code: EResponseCode.CONFLICT,
				message: 'User with this name already exists',
			},
		};
	}

	await usersRepository.createUser({
		id: generateId('usr'),
		email: body.email,
		password: createPasswordHash(body.password),
	});

	mail.send({
		from: appConfig.email.from,
		to: body.email,
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
		email: body.email,
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
	let expenesesRepository = new ExpensesRepository(db);
	let router = new Router();
	let cookie = createCookie();

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
		.addRoute('/expenses', expensesController, {
			secure: true,
		})
		.addRoute('/signin', postSignIn)
		/** @alias ./signin */
		.addRoute('/login', postSignIn)
		.addRoute('/signup', postSignUp);

	// eslint-disable-next-line complexity
	const server = createServer(async (request, response) => {
		try {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			let body: Record<any, any> | null = null;

			if (isJson(request)) {
				body = await readJsonBody(request);
			}

			if (request.headers.cookie) {
				cookie.load(request.headers.cookie);
			}

			/**
			 * @todo Remove queryParams from url
			 */
			let match = router.match(request.url ?? '');

			let canAccess = match?.options?.secure
				? checkAuthentication(session, cookie, appConfig)
				: true;

			let auth: {
				userId: string;
			};

			if (!canAccess) {
				let error = {
					code: EResponseCode.UNAUTHORIZED,
					message: 'Unauthorized',
				};

				throw error;
			} else if (canAccess && match?.options?.secure) {
				try {
					let sessionId = cookie.getValue('sessionId');

					assert.ok(sessionId);

					let sessionData = session.get(sessionId);

					assert.ok(sessionData);

					auth = {
						userId: sessionData.userId,
					};
				} catch {
					auth = {
						userId: '',
					};
				}
			}

			let dependencies = {
				db,
				mail,
				appConfig,
				usersRepository,
				expenesesRepository,
				session,
			};

			let routeHander =
				match?.handler<
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					Record<string, any> & {
						// eslint-disable-next-line @typescript-eslint/no-explicit-any
						error?: Record<string, any>;
						// eslint-disable-next-line @typescript-eslint/no-explicit-any
						meta?: Record<string, any>;
					}
				> || notFoundController;

			let result = await routeHander(
				{
					body,
					pathParams: match?.params || null,
					cookie,
					/** @todo Fix @ts-expect-error */
					/** @todo Fix @ts-expect-error */
					// @ts-expect-error | FIX
					auth,
				},
				dependencies,
				request,
				response,
			);

			if (result?.error) {
				sendJsonResponse(response, result.error?.code, {
					message: result.error?.message,
				});

				return;
			}

			let {
				/** @todo Fix @ts-expect-error */
				// @ts-expect-error | FIX
				meta,
				...responsePayload
			} = result;

			if (cookie.hasModified) {
				response.setHeader(
					'Set-Cookie',
					cookie.serialize({
						modifiedOnly: true,
					}),
				);
			}

			sendJsonResponse(
				response,
				meta?.code || EResponseCode.OK,
				responsePayload,
			);
		} catch (error) {
			let errorCode =
				/** @todo Fix @ts-expect-error */
				// @ts-expect-error | FIX
				error?.code ?? EResponseCode.INTERNAL_SERVER_ERROR;
			let errorMessage =
				/** @todo Fix @ts-expect-error */
				// @ts-expect-error | FIX
				error?.code ? error?.message : 'Internal server error';

			sendJsonResponse(response, errorCode, {
				message: errorMessage,
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
				// eslint-disable-next-line no-console
				console.log(
					`Server is running on port ${appConfig.port}, host ${appConfig.host}`,
				);
			},
		)
		.on('error', (error) => {
			if (
				/** @todo Fix @ts-expect-error */
				// @ts-expect-error | FIX
				error.code === 'EADDRINUSE'
			) {
				// eslint-disable-next-line no-console
				console.error('[Error] Address in use:', appConfig.port);
				db.close();
				server.close();
			}
		});

	let handleShutdown = createShutdownHandler(server, db);

	process.on(EProcessEvent.SIGINT, handleShutdown);
	process.on(EProcessEvent.SIGTERM, handleShutdown);
}

main();

function createShutdownHandler(server: Server, database: Database) {
	return function handleShutdown(signalName: EProcessEvent) {
		// eslint-disable-next-line no-console
		console.log('Server is shutting down due to:', signalName);

		server.close(() => {
			// eslint-disable-next-line no-console
			console.log('Server closed');

			database.close();

			// eslint-disable-next-line no-console
			console.log('Database closed');

			process.exit(0);
		});
	};
}

function isJson(request: TRequest): boolean {
	return request.headers['content-type'] === 'application/json';
}
