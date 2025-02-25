import { Cookie } from './cookie.ts';
import type { ICookie } from './types.ts';

export function createCookie(rawCookie?: string): ICookie {
	let cookieInstance = new Cookie();

	if (rawCookie) {
		cookieInstance.load(rawCookie);
	}

	return cookieInstance;
}
