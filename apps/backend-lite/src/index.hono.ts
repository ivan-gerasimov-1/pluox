import type { D1Database } from '@cloudflare/workers-types';

import { Hono } from 'hono';
import { deleteCookie, setSignedCookie } from 'hono/cookie';
import { cors } from 'hono/cors';
import { csrf } from 'hono/csrf';
import { jwt, sign, type JwtVariables } from 'hono/jwt';
import { secureHeaders } from 'hono/secure-headers';
import { validator } from 'hono/validator';

const app = new Hono<{
	Variables: JwtVariables<{
		id: string;
		email: string;
	}>;
	Bindings: {
		DB: D1Database;
	};
}>();

const JWT_TOKEN_SECRET = 'jwt-not-a-secret';

const AUTH_COOKIE_NAME = 'session';
const AUTH_COOKIE_SECRET = 'cookie-not-a-secret';

app
	.use(cors()) //
	.use(csrf())
	.use(secureHeaders())
	.get('/', async (c) => {
		return c.text('Hello Hono!');
	})
	.post(
		'/login',
		validator(
			'json',
			(
				value: {
					email: string;
					password: string;
				},
				c,
			) => {
				if (!value.email || !value.password) {
					return c.json(
						{
							error: {
								message: 'Missing email or password',
							},
						},
						400,
						{
							'Content-Type': 'application/json',
						},
					);
				}

				return value;
			},
		),
		async (c) => {
			let payload = c.req.valid('json');

			let statement = c.env.DB.prepare(
				'SELECT * FROM users WHERE email = ? AND password = ?',
			);

			let result = await statement.bind(payload.email, payload.password).first<{
				id: string;
				email: string;
				password: string;
			}>();

			if (!result) {
				return c.json(
					{
						error: {
							message:
								'Please check you entered your email and password correctly',
						},
					},
					400,
					{
						'Content-Type': 'application/json',
					},
				);
			}

			await setSignedCookie(
				c,
				AUTH_COOKIE_NAME,
				await sign(
					{
						id: result.id,
						email: result.email,
					},
					JWT_TOKEN_SECRET,
				),
				AUTH_COOKIE_SECRET,
			);

			return c.json({
				id: result.id,
				email: result.email,
			});
		},
	)
	.post('/logout', async (c) => {
		deleteCookie(c, AUTH_COOKIE_NAME);

		return c.json({
			status: 'success',
		});
	})
	.use('/users/*', (c, next) => {
		const jwtMiddleware = jwt({
			secret: JWT_TOKEN_SECRET,
			cookie: {
				key: AUTH_COOKIE_NAME,
				secret: AUTH_COOKIE_SECRET,
			},
		});
		return jwtMiddleware(c, next);
	})
	.get('/users/me', (c) => {
		let jwtPayload = c.get('jwtPayload');

		return c.json({
			id: jwtPayload.id,
			email: jwtPayload.email,
		});
	});

export default app;
