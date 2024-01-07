import Fastify from 'fastify';
import cors from '@fastify/cors';
import mongodb from '@fastify/mongodb';
import { appConfig } from './config';

(async function main() {
	const fastify = Fastify({
		logger: true,
	});

	const allowedOrigins = ['https://savee.vercel.app'];

	if (isDevelopment(process.env.NODE_ENV)) {
		allowedOrigins.push('http://localhost:3000');
	}

	await fastify.register(cors, {
		origin: allowedOrigins,
	});

	await fastify.register(mongodb, {
		url: `mongodb://${appConfig.db.user}:${appConfig.db.password}@localhost:27017/${appConfig.db.name}?authSource=${appConfig.db.auth}`,
		forceClose: true,
	});

	fastify.get('/', async function handler() {
		const usersCollection = fastify.mongo.db?.collection('users');
		const users = await usersCollection?.find({}).toArray();

		return {
			hello: 'world',
			version: '1.0.0',
			users: users?.length,
		};
	});

	try {
		await fastify.listen({
			port: appConfig.port,
		});
	} catch (error) {
		fastify.log.error(error);

		process.exit(1);
	}
})();

function isDevelopment(environment?: string) {
	return environment === 'development';
}
