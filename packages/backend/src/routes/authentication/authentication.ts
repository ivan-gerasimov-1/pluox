import bcrypt from 'bcrypt';
import { FastifyInstance } from 'fastify';
import { generateUserId } from '../../helpers/generateId';

export async function authenticationRouter(plugin: FastifyInstance) {
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
}
