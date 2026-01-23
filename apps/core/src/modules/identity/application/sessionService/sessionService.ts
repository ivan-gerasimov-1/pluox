import { SessionNotFoundError } from '@pluox/core/src/modules/identity/application/sessionService/errors';
import type { ISessionService } from '@pluox/core/src/modules/identity/application/sessionService/types';
import type {
	ISession,
	ISessionFactory,
} from '@pluox/core/src/modules/identity/domain/session/types';
import type { ISessionDataSource } from '@pluox/core/src/modules/identity/infrastructure/sessionDataSource/types';

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

	public get accessToken(): string | null {
		return this.session.authToken?.getValue().accessToken ?? null;
	}

	public get isAuthenticated(): boolean {
		return Boolean(this.session.authToken?.getValue().accessToken);
	}

	public get userId(): string {
		return this.session.userId;
	}

	public start(): void {
		let sessionDTO = this.sessionDataSource.findOne({
			id: 'data',
		});

		this.#session = sessionDTO
			? this.sessionFactory.create(sessionDTO)
			: this.createNewSession();
	}

	public setAccessToken(accessToken: string | null): void {
		this.session.setAccessToken(accessToken);

		this.sessionDataSource.update('data', {
			authToken: this.session.authToken?.getValue() ?? null,
		});
	}

	public removeAccessToken(): void {
		this.setAccessToken(null);
	}

	private createNewSession(): ISession {
		let session = this.sessionFactory.create();

		this.sessionDataSource.insert('data', {
			clientId: session.clientId.getValue(),
			userId: session.userId,
			authToken: session.authToken?.getValue() ?? null,
		});

		return session;
	}
}
