import type { TSessionDTO } from '@root/core/modules/identity/application/dto/sessionDTO';
import { SessionNotFoundError } from '@root/core/modules/identity/application/sessionService/errors';
import type { ISessionService } from '@root/core/modules/identity/application/sessionService/types';
import type { IUserService } from '@root/core/modules/identity/application/userService/types';
import type { IClientIdFactory } from '@root/core/modules/identity/domain/clientId/types';
import { Session } from '@root/core/modules/identity/domain/session/session';
import type { ISession } from '@root/core/modules/identity/domain/session/types';
import type { ISessionDataSource } from '@root/core/modules/identity/infrastructure/sessionDataSource/types';

export class SessionService implements ISessionService {
	#session: ISession | null;

	constructor(
		private readonly sessionStorage: ISessionDataSource,
		private readonly clientIdFactory: IClientIdFactory,
		private readonly userService: IUserService,
	) {
		this.#session = null;
	}

	private get session(): ISession {
		if (!this.#session) {
			throw new SessionNotFoundError();
		}

		return this.#session;
	}

	public start(): void {
		let sessionDTO = this.sessionStorage.read();

		this.#session = sessionDTO
			? this.createSessionFromDTO(sessionDTO)
			: this.createNewSession();
	}

	private createSessionFromDTO(sessionDTO: TSessionDTO): ISession {
		return new Session(
			this.clientIdFactory.create(sessionDTO.clientId),
			sessionDTO.userId,
			sessionDTO.authToken,
		);
	}

	private createNewSession(): ISession {
		let clientId = this.clientIdFactory.create();
		let user = this.userService.createUser({
			email: '',
			name: '',
		});

		let session = new Session(clientId, user.id, null);

		this.sessionStorage.create({
			clientId: session.clientId.getValue(),
			userId: session.userId,
			authToken: session.authToken,
		});

		return session;
	}
}
