import Fastify from 'fastify';
import cors from '@fastify/cors';

(async function main() {
	const fastify = Fastify({
		logger: true,
	});

	await fastify.register(cors, {
		origin: ['https://savee.vercel.app', 'http://localhost:3000'],
	});

	fastify.get('/', async function handler() {
		return {
			hello: 'world',
			version: '1.0.0',
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
