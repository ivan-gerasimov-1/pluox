import { betterAuth, type BetterAuthOptions } from 'better-auth';
import {
	type DB,
	drizzleAdapter,
	type DrizzleAdapterConfig,
} from 'better-auth/adapters/drizzle';

import * as schema from '#db/schema/schema';
import { type D1Database } from '@cloudflare/workers-types';
import { drizzle as drizzleD1 } from 'drizzle-orm/d1';

const drizzleAdapterConfig = {
	provider: 'sqlite',
	usePlural: true,
} satisfies DrizzleAdapterConfig;

const betterAuthConfig = {
	emailAndPassword: {
		enabled: true,
	},
} satisfies BetterAuthOptions;

export function createAuthClient(database: DB) {
	return betterAuth({
		database: drizzleAdapter(database, drizzleAdapterConfig),
		...betterAuthConfig,
	});
}

export interface IAuthClient extends ReturnType<typeof createAuthClient> {}

/**
 * @description
 * For @better-auth/cli usage only
 *
 * @deprecated Don’t use this, use `createAuthClient` instead
 */
export const auth = betterAuth({
	database: drizzleAdapter(
		drizzleD1(null as unknown as D1Database, {
			schema,
		}),
		drizzleAdapterConfig,
	),
	...betterAuthConfig,
});
