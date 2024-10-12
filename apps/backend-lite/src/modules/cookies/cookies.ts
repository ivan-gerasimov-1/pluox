import type { TRequest } from '#app/types';

/**
 * @deprecated
 */
export function getSessionIdFromCookies(request: TRequest) {
	const cookies = request.headers.cookie;

	if (!cookies) {
		return null;
	}

	const cookiesParsed: {
		sessionId?: string;
	} = cookies.split(';').reduce((state, cookie) => {
		let [key, value] = cookie.trim().split('=');

		state[key] = value;

		return state;
	}, {});

	return cookiesParsed.sessionId;
}
