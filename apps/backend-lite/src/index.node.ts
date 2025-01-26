import { serve } from '@hono/node-server';
import { default as app } from '#app/index.hono';

const APP_PORT = 3000;

console.log(`Server is running on http://localhost:${APP_PORT}`);

serve({
	fetch: app.fetch,
	port: APP_PORT,
});
