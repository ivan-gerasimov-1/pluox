import { getSessionIdFromCookies } from '#app/modules/cookies/cookies';

import type { Session } from '#app/modules/session/session';
import type { TRequest } from '#app/types';

export function checkAuthentication(request: TRequest, session: Session) {
	let sessionId = getSessionIdFromCookies(request);

	return session.has(sessionId);
}
