import type { KVNamespace } from '@cloudflare/workers-types';
import { Hono } from 'hono';
import { env } from 'hono/adapter';
import { cors } from 'hono/cors';
import { csrf } from 'hono/csrf';
import { secureHeaders } from 'hono/secure-headers';

export const app = new Hono<{
	Bindings: {
		CURRENCIES_KV: KVNamespace;

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
			origin: ['https://pluox.gerasimov.dev'],
			credentials: true,
		}),
	) //
	.use(csrf())
	.use(secureHeaders())
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
						code: 500,
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
