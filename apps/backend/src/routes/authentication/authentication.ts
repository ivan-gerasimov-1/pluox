import bcrypt from 'bcrypt';
import { FastifyInstance } from 'fastify';
import { generateUserId } from './helpers/generateUserId';

type TSignupPayload = {
	email: string;
	password: string;
};

type TLoginPayload = {
	email: string;
	password: string;
};

export async function authenticationRouter(plugin: FastifyInstance) {
	plugin.post<{
		Body: TSignupPayload;
	}>('/signup', async function handler(request, response) {
		let payload = request.body;

		const hashedPassword = await bcrypt.hash(payload.password, 10);

		const usersCollection = plugin.mongo.db?.collection('users');

		const userId = generateUserId();

		await usersCollection?.insertOne({
			id: userId,
			email: payload.email,
			password: hashedPassword,
		});

		response.send({
			id: userId,
			email: payload.email,
		});
	});

	plugin.post<{
		Body: TLoginPayload;
	}>('/login', async (request, reply) => {
		let payload = request.body;

		const usersCollection = plugin.mongo.db?.collection('users');
		const user = await usersCollection?.findOne({
			email: payload.email,
		});

		const isPasswordValid = await bcrypt.compare(
			payload.password,
			user?.password,
		);

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
