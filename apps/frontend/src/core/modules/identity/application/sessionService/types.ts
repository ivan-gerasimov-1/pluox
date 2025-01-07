import type { ISession } from '@root/core/modules/identity/domain/session/types';

export interface ISessionService {
	readonly session: ISession;

	readonly accessToken: string | null;
	readonly isAuthenticated: boolean;

	readonly userId: string;

	start(): void;

	setAccessToken(accessToken: string): void;
	removeAccessToken(): void;
}
