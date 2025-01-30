import { serve } from '@hono/node-server';
import { app } from '#app/app';

serve(
	{
		fetch: app.fetch,
		hostname: process.env.APP_HOST,
		port: Number.parseInt(process.env.APP_PORT as string, 10),
	},
	(info) => {
		console.log(
			`Server is running on ${info.address}:${info.port} (${info.family})`,
		);
	},
);
