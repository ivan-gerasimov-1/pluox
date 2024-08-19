import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
import mongodb from '@fastify/mongodb';
import Fastify from 'fastify';
import { appConfig } from './config';
import { isDevelopment } from './helpers/isDevelopment';
import { authenticationRouter } from './routes/authentication/authentication';
import { expensesRouter } from './routes/expenses/expenses';

export function createApp() {
	const app = Fastify({
		logger: true,
	});

	let allowedOrigins = getAllowedOrigins({
		isDevelopment: isDevelopment(process.env.NODE_ENV),
	});

	let mongoUri = getMongoDbConnectionString({
		username: appConfig.db.user,
		password: appConfig.db.password,
		host: appConfig.db.host,
		port: appConfig.db.port,
		database: appConfig.db.name,
		authSource: appConfig.db.auth,
	});

	app
		.register(cors, {
			origin: allowedOrigins,
		})
		.register(mongodb, {
			url: mongoUri,
			forceClose: true,
		})
		.register(jwt, {
			secret: appConfig.jwt.secret,
		});

	app.get('/', async function handler() {
		return {
			version: '0.1.0',
		};
	});

	app //
		.register(authenticationRouter)
		.register(expensesRouter);

	return app;
}

function getAllowedOrigins(params: { isDevelopment: boolean }): string[] {
	let allowedOrigins = [
		'https://savee.gerasimov.dev',
		'https://savee-api.gerasimov.dev',
		/** @deprecated */
		'https://savee.vercel.app',
	];

	if (params.isDevelopment) {
		allowedOrigins.push('http://localhost:3000');
	}

	return allowedOrigins;
}

function getMongoDbConnectionString(params: {
	username: string;
	password: string;
	host: string;
	port: string;
	database: string;
	authSource: string;
}) {
	return `mongodb://${params.username}:${params.password}@${params.host}:${params.port}/${params.database}?authSource=${params.authSource}`;
}
