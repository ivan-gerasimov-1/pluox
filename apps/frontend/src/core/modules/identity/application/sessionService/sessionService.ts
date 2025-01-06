import { SessionNotFoundError } from '@root/core/modules/identity/application/sessionService/errors';
import type { ISessionService } from '@root/core/modules/identity/application/sessionService/types';
import type {
	ISession,
	ISessionFactory,
} from '@root/core/modules/identity/domain/session/types';
import type { ISessionDataSource } from '@root/core/modules/identity/infrastructure/sessionDataSource/types';

export class SessionService implements ISessionService {
	#session: ISession | null;

	constructor(
		private readonly sessionDataSource: ISessionDataSource,
		private readonly sessionFactory: ISessionFactory,
	) {
		this.#session = null;
	}

	public get session(): ISession {
		if (!this.#session) {
			throw new SessionNotFoundError();
		}

		return this.#session;
	}

	public get authToken(): string | null {
		return this.session.authToken;
	}

	public get isAuthenticated(): boolean {
		return Boolean(this.session.authToken);
	}

	public get userId(): string {
		return this.session.userId;
	}

	public start(): void {
		let sessionDTO = this.sessionDataSource.read();

		this.#session = sessionDTO
			? this.sessionFactory.create(sessionDTO)
			: this.createNewSession();
	}

	public setAuthToken(authToken: string | null): void {
		this.session.setAuthToken(authToken);

		this.sessionDataSource.update({
			authToken,
		});
	}

	public removeAuthToken(): void {
		this.setAuthToken(null);
	}

	private createNewSession(): ISession {
		let session = this.sessionFactory.create();

		this.sessionDataSource.create({
			clientId: session.clientId.getValue(),
			userId: session.userId,
			authToken: session.authToken,
		});

		return session;
	}
}
