import type { TAppConfig } from '#app/modules/appConfig/types';
import type { ICookie } from '#app/modules/cookie/index';

import type { Session } from '#app/modules/session/session';

export function checkAuthentication(
	session: Session,
	cookie: ICookie,
	appConfig: TAppConfig,
): boolean {
	let sessionId = cookie.getValue('sessionId');

	/**
	 * @description Find a better way to bypass authentication in local environment
	 */
	if (appConfig.env === 'local' && sessionId === 'letMeIn') {
		return true;
	}

	if (!sessionId) {
		return false;
	}

	return session.has(sessionId);
}
