import Fastify from 'fastify';

(async function main() {
	const fastify = Fastify({
		logger: true,
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
