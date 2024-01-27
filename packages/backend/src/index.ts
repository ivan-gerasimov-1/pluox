import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
import mongodb from '@fastify/mongodb';
import bcrypt from 'bcrypt';
import Fastify from 'fastify';
import { generateUserId } from './generateId';
import { appConfig } from './config';
import { isDevelopment } from './helpers/isDevelopment';

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

	await fastify.register(jwt, {
		secret: appConfig.jwt.secret,
	});

	fastify.get('/', async function handler() {
		return {
			version: '0.1.0',
		};
	});

	fastify.register(async (plugin) => {
		plugin.post('/signup', async function handler(request, response) {
			// @ts-expect-error
			const { email, password } = request.body;
			const hashedPassword = await bcrypt.hash(password, 10);

			const usersCollection = plugin.mongo.db?.collection('users');

			const userId = generateUserId();

			await usersCollection?.insertOne({
				id: userId,
				email,
				password: hashedPassword,
			});

			response.send({
				id: userId,
				email,
			});
		});

		plugin.post('/login', async (request, reply) => {
			// @ts-expect-error
			const { email, password } = request.body;

			const usersCollection = plugin.mongo.db?.collection('users');
			const user = await usersCollection?.findOne({
				email,
			});

			const isPasswordValid = await bcrypt.compare(password, user?.password);

			if (!isPasswordValid) {
				reply.code(401).send({
					status: 'error',
					message: 'Invalid credentials',
				});
				return;
			}

			const token = plugin.jwt.sign({
				id: user?.id,
			});

			reply.send({
				id: user?.id,
				email: user?.email,
				token,
			});
		});
	});

	fastify.register(async (plugin) => {
		plugin.addHook('preHandler', async (request, reply) => {
			try {
				await request.jwtVerify();
			} catch (error) {
				reply.code(401).send({
					status: 'error',
					message: 'Unauthorized',
				});
			}
		});

		plugin.get('/test', async (request, reply) => {
			reply.send({
				status: 'success',
				message: 'You are authenticated',
			});
		});
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
