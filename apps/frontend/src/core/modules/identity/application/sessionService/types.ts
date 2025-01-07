import type { ISession } from '@root/core/modules/identity/domain/session/types';

export interface ISessionService {
	readonly session: ISession;

	readonly accessToken: string | null;
	readonly isAuthenticated: boolean;

	readonly userId: string;

	start(): void;

	setAccessToken(accessToken: string): void;
	removeAccessToken(): void;

	/**
	 * @todo
	 * Implement authentication in terms of Session — on successfull login
	 * SessionService creates new AuthToken (userId and accessToken pair),
	 * on logout SessionService removes AuthToken. If accessToken is expired
	 * SessionService removes AuthToken
	 */
	// authenticate(): void;
	// deauthenticate(): void;
}
