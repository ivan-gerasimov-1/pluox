import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
import mongodb from '@fastify/mongodb';
import Fastify from 'fastify';
import { appConfig } from './config';
import { isDevelopment } from './helpers/isDevelopment';
import { authenticationRouter } from './routes/authentication/authentication';
import { expensesRouter } from './routes/expenses/expenses';

function getAllowedOrigins(params: { isDevelopment: boolean }): string[] {
	let allowedOrigins = [
		'https://savee.gerasimov.dev',
		/** @deprecated */
		'https://savee.vercel.app',
	];

	if (params.isDevelopment) {
		allowedOrigins.push('http://localhost:3000');
	}

	return allowedOrigins;
}

export function createApp() {
	const app = Fastify({
		logger: true,
	});

	let allowedOrigins = getAllowedOrigins({
		isDevelopment: isDevelopment(process.env.NODE_ENV),
	});

	app
		.register(cors, {
			origin: allowedOrigins,
		})
		.register(mongodb, {
			url: `mongodb://${appConfig.db.user}:${appConfig.db.password}@${appConfig.db.host}:${appConfig.db.port}/${appConfig.db.name}?authSource=${appConfig.db.auth}`,
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
