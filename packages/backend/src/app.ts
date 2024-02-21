import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
import mongodb from '@fastify/mongodb';
import bcrypt from 'bcrypt';
import Fastify from 'fastify';
import { appConfig } from './config';
import { generateExpenseId, generateUserId } from './helpers/generateId';
import { isDevelopment } from './helpers/isDevelopment';

const ALLOWED_ORIGINS = ['https://savee.vercel.app'];

export function createApp() {
	const fastify = Fastify({
		logger: true,
	});

	if (isDevelopment(process.env.NODE_ENV)) {
		ALLOWED_ORIGINS.push('http://localhost:3000');
	}

	fastify.register(cors, {
		origin: ALLOWED_ORIGINS,
	});

	fastify.register(mongodb, {
		url: `mongodb://${appConfig.db.user}:${appConfig.db.password}@localhost:27017/${appConfig.db.name}?authSource=${appConfig.db.auth}`,
		forceClose: true,
	});

	fastify.register(jwt, {
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

		plugin.post('/expenses', async (request, reply) => {
			const userJwt = request.user as { id: string };
			const userId = userJwt.id;

			const usersCollection = plugin.mongo.db?.collection('users');
			const user = await usersCollection?.findOne({ id: userId });

			if (!user) {
				reply.code(404).send({
					status: 'error',
					message: 'User Not Found',
				});
			}

			const expensesCollection = plugin.mongo.db?.collection('expenses');
			const id = generateExpenseId();
			const date =
				// @ts-expect-error
				request.body.dateCreated
					? new Date(
							// @ts-expect-error
							request.body.dateCreated,
					  )
					: new Date();

			await expensesCollection?.insertOne({
				id,
				ownerId: user?._id,
				// @ts-expect-error
				amount: request.body.amount,
				// @ts-expect-error
				amountInUSD: request.body.amountInUSD,
				// @ts-expect-error
				currency: request.body.currency,
				// @ts-expect-error
				comment: request.body.comment,
				// @ts-expect-error
				category: request.body.category,
				date: new Date(
					// @ts-expect-error
					request.body.date,
				),
				createdAt: date,
				updatedAt: date,
			});

			reply.code(200).send({
				id,
			});
		});

		plugin.get('/expenses/:id', async (request, reply) => {
			const userJwt = request.user as { id: string };
			const userId = userJwt.id;

			const usersCollection = plugin.mongo.db?.collection('users');
			const user = await usersCollection?.findOne({ id: userId });

			if (!user) {
				reply.code(404).send({
					status: 'error',
					message: 'User Not Found',
				});
			}

			const expensesCollection = plugin.mongo.db?.collection('expenses');
			const expense = await expensesCollection?.findOne({
				ownerId: user?._id,
				// @ts-expect-error
				id: request.params.id,
			});

			if (!expense) {
				reply.code(404).send({
					status: 'error',
					message: 'Expense Not Found',
				});
				return;
			}

			reply.send({
				id: expense.id,
				amount: expense.amount,
				amountInUSD: expense.amountInUSD,
				currency: expense.currency,
				comment: expense.comment,
				category: expense.category,
				date: expense.date,
				createdAt: expense.createdAt,
				updatedAt: expense.updatedAt,
			});
		});

		plugin.put('/expenses/:id', async (request, reply) => {
			const userJwt = request.user as { id: string };
			const userId = userJwt.id;

			const usersCollection = plugin.mongo.db?.collection('users');
			const user = await usersCollection?.findOne({ id: userId });

			if (!user) {
				reply.code(404).send({
					status: 'error',
					message: 'User Not Found',
				});
			}

			const expensesCollection = plugin.mongo.db?.collection('expenses');
			const expense = await expensesCollection?.findOneAndUpdate(
				{
					ownerId: user?._id,
					// @ts-expect-error
					id: request.params.id,
				},
				{
					$set: {
						// @ts-expect-error
						amount: request.body.amount,
						updatedAt: new Date(),
					},
				},
			);

			if (!expense) {
				reply.code(404).send({
					status: 'error',
					message: 'Expense Not Found',
				});
				return;
			}

			reply.send({
				status: 'success',
			});
		});

		plugin.delete('/expenses/:id', async (request, reply) => {
			const userJwt = request.user as { id: string };
			const userId = userJwt.id;

			const usersCollection = plugin.mongo.db?.collection('users');
			const user = await usersCollection?.findOne({ id: userId });

			if (!user) {
				reply.code(404).send({
					status: 'error',
					message: 'User Not Found',
				});
			}

			const expensesCollection = plugin.mongo.db?.collection('expenses');
			const expense = await expensesCollection?.deleteOne({
				ownerId: user?._id,
				// @ts-expect-error
				id: request.params.id,
			});

			if (!expense) {
				reply.code(404).send({
					status: 'error',
					message: 'Expense Not Found',
				});
				return;
			}

			reply.send({
				status: 'success',
			});
		});
	});

	return fastify;
}
