import type { ISessionService } from '@root/core/modules/identity/application/sessionService/types';
import type { IUserService } from '@root/core/modules/identity/application/userService/types';
import type { ISession } from '@root/core/modules/identity/domain/session/types';
import type { ISessionDataSource } from '@root/core/modules/identity/infrastructure/sessionDataSource/types';
import { Session } from '@root/core/modules/identity/domain/session/session';
import type {
	IClientId,
	IClientIdFactory,
} from '@root/core/modules/identity/domain/clientId/types';
import type { TSessionDTO } from '@root/core/modules/identity/application/dto/sessionDTO';
import type { Id } from '@root/core/domain/types';
import type { TUserDTO } from '@root/core/modules/identity/application/dto/userDTO';
import { SessionNotFoundError } from '@root/core/modules/identity/application/sessionService/errors';

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
		const sessionDTO = this.restoreSessionFromStorage();

		if (sessionDTO) {
			this.#session = this.createSession(
				this.createClientId(sessionDTO.clientId),
				sessionDTO.userId,
			);

			return;
		}

		let clientId = this.createClientId();
		let user = this.createNewUser();

		this.#session = this.createSession(clientId, user.id);

		this.sessionStorage.create({
			clientId: this.#session.clientId.getValue(),
			userId: this.#session.userId,
		});
	}

	private restoreSessionFromStorage(): TSessionDTO | null {
		return this.sessionStorage.read();
	}

	private createSession(clientId: IClientId, userId: Id): ISession {
		return new Session(clientId, userId);
	}

	private createClientId(id?: Id): IClientId {
		return this.clientIdFactory.create(id);
	}

	private createNewUser(): TUserDTO {
		return this.userService.createUser({
			email: '',
			name: '',
		});
	}
}
