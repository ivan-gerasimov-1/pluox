import { Hono } from 'hono';
import { deleteCookie, setSignedCookie } from 'hono/cookie';
import { cors } from 'hono/cors';
import { csrf } from 'hono/csrf';
import { jwt, sign, type JwtVariables } from 'hono/jwt';
import { secureHeaders } from 'hono/secure-headers';

type Variables = JwtVariables<{ id: string }>;

const app = new Hono<{
	Variables: Variables;
}>();

const JWT_TOKEN_SECRET = 'jwt-not-a-secret';

const AUTH_COOKIE_NAME = 'session';
const AUTH_COOKIE_SECRET = 'cookie-not-a-secret';

app
	.use(cors()) //
	.use(csrf())
	.use(secureHeaders())
	.get('/', (c) => {
		return c.text('Hello Hono!');
	})
	.post('/login', async (c) => {
		await setSignedCookie(
			c,
			AUTH_COOKIE_NAME,
			await sign({ id: 'userId1' }, JWT_TOKEN_SECRET),
			AUTH_COOKIE_SECRET,
		);

		return c.json({
			id: 'userId1',
		});
	})
	.post('/logout', async (c) => {
		deleteCookie(c, AUTH_COOKIE_NAME);

		return c.json({
			status: 'success',
		});
	})
	.use(
		'/users/*',
		jwt({
			secret: JWT_TOKEN_SECRET,
			cookie: {
				key: AUTH_COOKIE_NAME,
				secret: AUTH_COOKIE_SECRET,
			},
		}),
	)
	.get('/users/me', (c) => {
		let jwtPayload = c.get('jwtPayload');

		return c.json({
			user: jwtPayload.id,
		});
	});

export default app;
