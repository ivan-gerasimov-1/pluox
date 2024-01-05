import Fastify from 'fastify';
import cors from '@fastify/cors';
import mongodb from '@fastify/mongodb';

(async function main() {
	const fastify = Fastify({
		logger: true,
	});

	await fastify.register(cors, {
		origin: ['https://savee.vercel.app', 'http://localhost:3000'],
	});

	await fastify.register(mongodb, {
		url: 'mongodb://staging:fZmbFziM-8onskLQUf-oXifPyaaJgs2j@localhost:27017/staging',
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
			port: 3001,
		});
	} catch (error) {
		fastify.log.error(error);

		process.exit(1);
	}
})();
