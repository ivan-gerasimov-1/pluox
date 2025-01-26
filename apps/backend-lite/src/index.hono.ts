import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { csrf } from 'hono/csrf';
import { secureHeaders } from 'hono/secure-headers';

const app = new Hono();

app
	.use(cors()) //
	.use(csrf())
	.use(secureHeaders())
	.get('/', (c) => {
		return c.text('Hello Hono!');
	});

export default app;
