import { Cookie } from './cookie.ts';
import type { ICookie } from './types.ts';

export function createCookie(cookie: string): ICookie {
	let cookieInstance = new Cookie();

	cookieInstance.parse(cookie);

	return cookieInstance;
}
