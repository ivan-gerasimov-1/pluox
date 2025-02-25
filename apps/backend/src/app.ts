import type { D1Database } from '@cloudflare/workers-types';

import { Hono } from 'hono';
import { env } from 'hono/adapter';
import { deleteCookie, setSignedCookie } from 'hono/cookie';
import { cors } from 'hono/cors';
import { csrf } from 'hono/csrf';
import { jwt, sign, type JwtVariables } from 'hono/jwt';
import { secureHeaders } from 'hono/secure-headers';

import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';

import { EResponseCode } from '#app/enums';
import {
	comparePasswordHash,
	createPasswordHash,
} from '#app/modules/crypto/index';

export const app = new Hono<{
	Variables: JwtVariables<{
		id: string;
		email: string;
	}>;
	Bindings: {
		DB: D1Database;

		/** Secrets */
		JWT_TOKEN_SECRET: string;
		AUTH_COOKIE_SECRET: string;

		/** Variables */
		AUTH_COOKIE_NAME: string;
	};
}>();

app
	.use(
		cors({
			origin: ['https://savee.gerasimov.dev'],
			credentials: true,
		}),
	) //
	.use(csrf())
	.use(secureHeaders())
	.post(
		'/signup',
		zValidator(
			'json',
			z.object({
				id: z.string().nonempty(),
				email: z.string().email(),
				password: z.string().min(8),
				name: z.string(),
				locale: z.string().nonempty(),
				createdAt: z.string().datetime(),
				modifiedAt: z.string().datetime(),
			}),
		),
		async (c) => {
			let payload = c.req.valid('json');

			let existingUser = await env(c)
				.DB //
				.prepare('SELECT * FROM users WHERE email = ?')
				.bind(payload.email)
				.first<{
					id: string;
					email: string;
				}>();

			if (existingUser) {
				return c.json({
					error: {
						code: EResponseCode.CONFLICT,
						message: 'User already exists',
					},
				});
			}

			let user = {
				id: payload.id,
				email: payload.email,
				password: createPasswordHash(payload.password),
				name: payload.name,
				locale: payload.locale,
				createdAt: payload.createdAt,
				modifiedAt: payload.modifiedAt,
			};

			let result = await env(c)
				.DB //
				.prepare(
					'INSERT INTO users (id, email, password) VALUES (:id, :email, :password)',
				)
				.bind(user.id, user.email, user.password)
				.run();

			if (!result.success) {
				return c.json({
					error: {
						code: EResponseCode.INTERNAL_SERVER_ERROR,
						message: 'Unable to create new user',
					},
				});
			}

			await setSignedCookie(
				c,
				env(c).AUTH_COOKIE_NAME,
				await sign(
					{
						id: user.id,
						email: user.email,
					},
					env(c).JWT_TOKEN_SECRET,
				),
				env(c).AUTH_COOKIE_SECRET,
				{
					httpOnly: true,
					secure: true,
					sameSite: 'Lax',
				},
			);

			return c.json({
				id: user.id,
				email: user.email,
			});
		},
	)
	.post(
		'/login',
		zValidator(
			'json',
			z.object({
				email: z.string().email(),
				password: z.string().nonempty(),
			}),
		),
		async (c) => {
			let payload = c.req.valid('json');

			let user = await env(c)
				.DB //
				.prepare('SELECT * FROM users WHERE email = ?')
				.bind(payload.email)
				.first<{
					id: string;
					email: string;
					password: string;
				}>();

			if (!user || !comparePasswordHash(payload.password, user.password)) {
				return c.json(
					{
						error: {
							message: 'Please ensure both email and password are correct',
						},
					},
					400,
				);
			}

			await setSignedCookie(
				c,
				env(c).AUTH_COOKIE_NAME,
				await sign(
					{
						id: user.id,
						email: user.email,
					},
					env(c).JWT_TOKEN_SECRET,
				),
				env(c).AUTH_COOKIE_SECRET,
				{
					httpOnly: true,
					secure: true,
					sameSite: 'Lax',
				},
			);

			return c.json({
				id: user.id,
				email: user.email,
			});
		},
	)
	.post('/logout', async (c) => {
		deleteCookie(c, env(c).AUTH_COOKIE_NAME);

		return c.json({
			status: 'success',
		});
	})
	.use('/users/*', (c, next) => {
		const jwtMiddleware = jwt({
			secret: env(c).JWT_TOKEN_SECRET,
			cookie: {
				key: env(c).AUTH_COOKIE_NAME,
				secret: env(c).AUTH_COOKIE_SECRET,
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
