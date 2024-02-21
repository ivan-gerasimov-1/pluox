import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
import mongodb from '@fastify/mongodb';
import Fastify from 'fastify';
import { appConfig } from './config';
import { isDevelopment } from './helpers/isDevelopment';
import { authenticationRouter } from './routes/authentication/authentication';
import { expensesRouter } from './routes/expenses/expenses';

let allowedOrigins = ['https://savee.vercel.app'];

export function createApp() {
	const app = Fastify({
		logger: true,
	});

	if (isDevelopment(process.env.NODE_ENV)) {
		allowedOrigins.push('http://localhost:3000');
	}

	app
		.register(cors, {
			origin: allowedOrigins,
		})
		.register(mongodb, {
			url: `mongodb://${appConfig.db.user}:${appConfig.db.password}@localhost:27017/${appConfig.db.name}?authSource=${appConfig.db.auth}`,
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

	app.register(authenticationRouter).register(expensesRouter);

	return app;
}
