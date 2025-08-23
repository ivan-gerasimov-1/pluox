import type { D1Database } from '@cloudflare/workers-types';
import { drizzle as drizzleD1 } from 'drizzle-orm/d1';

import * as schema from '#db/schema/schema';

export function createD1Instance(db: D1Database) {
	return drizzleD1(db, {
		schema,
	});
}

export type TDbClient = ReturnType<typeof createD1Instance>;
