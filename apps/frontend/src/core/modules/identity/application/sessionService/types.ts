import type { ISession } from '@root/core/modules/identity/domain/session/types';

export interface ISessionService {
	readonly session: ISession;

	readonly authToken: string | null;
	readonly isAuthenticated: boolean;

	start(): void;

	setAuthToken(authToken: string): void;
	removeAuthToken(): void;
}
