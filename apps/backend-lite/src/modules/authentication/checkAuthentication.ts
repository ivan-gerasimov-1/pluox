import type { TAppConfig } from '#app/modules/appConfig/types';
import { getSessionIdFromCookies } from '#app/modules/cookies/cookies';

import type { Session } from '#app/modules/session/session';
import type { TRequest } from '#app/types';

export function checkAuthentication(
	request: TRequest,
	session: Session,
	appConfig: TAppConfig,
) {
	let sessionId = getSessionIdFromCookies(request);

	if (appConfig.env === 'local' && sessionId === 'letMeIn') {
		return true;
	}

	return session.has(sessionId);
}
