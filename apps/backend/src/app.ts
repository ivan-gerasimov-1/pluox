import type { D1Database, KVNamespace } from '@cloudflare/workers-types';

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
		CURRENCIES_KV: KVNamespace;

		/** Secrets */
		JWT_TOKEN_SECRET: string;
		AUTH_COOKIE_SECRET: string;

		/** Variables */
		AUTH_COOKIE_NAME: string;

		/** Open Exchange Rates */
		/** Variables */
		APP_OPEN_EXCHANGE_RATES_API_URL: string;
		/** Secrets */
		APP_OPEN_EXCHANGE_RATES_API_KEY: string;
	};
}>();

app
	.use(
		cors({
			origin: [
				'https://pluox.gerasimov.dev',
				/** @deprecated */
				'https://savee.gerasimov.dev',
			],
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
		async (ctx) => {
			let payload = ctx.req.valid('json');

			let existingUser = await env(ctx)
				.DB //
				.prepare('SELECT * FROM users WHERE email = ?')
				.bind(payload.email)
				.first<{
					id: string;
					email: string;
				}>();

			if (existingUser) {
				return ctx.json({
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

			let result = await env(ctx)
				.DB //
				.prepare(
					'INSERT INTO users (id, email, password) VALUES (:id, :email, :password)',
				)
				.bind(user.id, user.email, user.password)
				.run();

			if (!result.success) {
				return ctx.json({
					error: {
						code: EResponseCode.INTERNAL_SERVER_ERROR,
						message: 'Unable to create new user',
					},
				});
			}

			await setSignedCookie(
				ctx,
				env(ctx).AUTH_COOKIE_NAME,
				await sign(
					{
						id: user.id,
						email: user.email,
					},
					env(ctx).JWT_TOKEN_SECRET,
				),
				env(ctx).AUTH_COOKIE_SECRET,
				{
					httpOnly: true,
					secure: true,
					sameSite: 'Lax',
				},
			);

			return ctx.json({
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
		async (ctx) => {
			let payload = ctx.req.valid('json');

			let user = await env(ctx)
				.DB //
				.prepare('SELECT * FROM users WHERE email = ?')
				.bind(payload.email)
				.first<{
					id: string;
					email: string;
					password: string;
				}>();

			if (!user || !comparePasswordHash(payload.password, user.password)) {
				return ctx.json(
					{
						error: {
							message: 'Please ensure both email and password are correct',
						},
					},
					400,
				);
			}

			await setSignedCookie(
				ctx,
				env(ctx).AUTH_COOKIE_NAME,
				await sign(
					{
						id: user.id,
						email: user.email,
					},
					env(ctx).JWT_TOKEN_SECRET,
				),
				env(ctx).AUTH_COOKIE_SECRET,
				{
					httpOnly: true,
					secure: true,
					sameSite: 'Lax',
				},
			);

			return ctx.json({
				id: user.id,
				email: user.email,
			});
		},
	)
	.post('/logout', async (ctx) => {
		deleteCookie(ctx, env(ctx).AUTH_COOKIE_NAME);

		return ctx.json({
			status: 'success',
		});
	})
	.use('/users/*', (ctx, next) => {
		const jwtMiddleware = jwt({
			secret: env(ctx).JWT_TOKEN_SECRET,
			cookie: {
				key: env(ctx).AUTH_COOKIE_NAME,
				secret: env(ctx).AUTH_COOKIE_SECRET,
			},
		});
		return jwtMiddleware(ctx, next);
	})
	.get('/users/me', (ctx) => {
		let jwtPayload = ctx.get('jwtPayload');

		return ctx.json({
			id: jwtPayload.id,
			email: jwtPayload.email,
		});
	})
	/**
	 * @route GET /currencies
	 * @description Retrieves current exchange rates for supported currencies
	 * @returns {Object} JSON response containing:
	 *   - timestamp {number} - Unix timestamp of the exchange rates data
	 *   - base {string} - Base currency code (typically USD)
	 *   - rates {Object} - Exchange rates for supported currencies
	 *
	 * @example
	 * // Response example:
	 * {
	 *   "timestamp": 1679529600,
	 *   "base": "USD",
	 *   "rates": {
	 *     "GEL": 2.5,
	 *     "RUB": 76.2,
	 *     "USD": 1,
	 *     "EUR": 0.92,
	 *     "THB": 34.1
	 *   }
	 * }
	 *
	 * @error {500} Internal Server Error - Returns when API call fails
	 * @note Data is cached in Cloudflare KV with key format: currencies_rates_YYYY-MM-DD
	 * @note Supported currencies: GEL, RUB, USD, EUR, THB
	 */
	.get('/currencies', async (ctx) => {
		const SUPPORTED_CURRENCIES = ['GEL', 'RUB', 'USD', 'EUR', 'THB', 'RSD'];

		let currentDate = new Date().toISOString().split('T')[0];
		let KV_KEY = `currencies_rates_${currentDate}`;

		try {
			let cachedData = await env(ctx).CURRENCIES_KV.get(KV_KEY, 'json');

			if (cachedData) {
				return ctx.json(cachedData);
			}

			let url = new URL(
				`${env(ctx).APP_OPEN_EXCHANGE_RATES_API_URL}/latest.json`,
			);

			url.searchParams.set('prettyprint', '0');
			url.searchParams.set('symbols', SUPPORTED_CURRENCIES.join(','));

			let response = await fetch(url.toString(), {
				headers: {
					Authorization: `Token ${env(ctx).APP_OPEN_EXCHANGE_RATES_API_KEY}`,
				},
			});

			if (!response.ok) {
				throw new Error(
					`Failed to fetch currency rates: ${response.statusText}`,
				);
			}

			let responseData = await response.json();

			let result = {
				timestamp: responseData.timestamp,
				base: responseData.base,
				rates: responseData.rates,
			};

			await env(ctx).CURRENCIES_KV.put(KV_KEY, JSON.stringify(result));

			return ctx.json(result);
		} catch (error) {
			return ctx.json(
				{
					error: {
						code: EResponseCode.INTERNAL_SERVER_ERROR,
						message:
							error instanceof Error
								? error.message
								: 'Failed to fetch currency rates',
					},
				},
				500,
			);
		}
	});
