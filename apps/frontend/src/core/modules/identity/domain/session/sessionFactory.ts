import type { Id } from '@root/core/domain/types';
import type { TSessionDTO } from '@root/core/modules/identity/application/dto/sessionDTO';
import type {
	IClientId,
	IClientIdFactory,
} from '@root/core/modules/identity/domain/clientId/types';
import { InvalidSessionFactoryArgumentsError } from '@root/core/modules/identity/domain/session/errors';
import { Session } from '@root/core/modules/identity/domain/session/session';
import type {
	ISession,
	ISessionFactory,
} from '@root/core/modules/identity/domain/session/types';
import type { IUserService } from '@root/core/modules/user/application/userService/types';

export class SessionFactory implements ISessionFactory {
	constructor(
		private readonly clientIdFactory: IClientIdFactory,
		private readonly userService: IUserService,
	) {}

	public create(): ISession;
	public create(sessionDTO: TSessionDTO): ISession;
	public create(
		clientId: IClientId,
		userId: Id,
		authToken: string | null,
	): ISession;
	public create(
		arg1?: IClientId | TSessionDTO,
		arg2?: Id,
		arg3?: string | null,
	): ISession {
		if (!arg1) {
			return this.createNew();
		}

		if (this.isSessionDTO(arg1)) {
			return this.createFromDTO(arg1);
		}

		if (
			typeof arg2 === 'string' &&
			(typeof arg3 === 'string' || arg3 === null)
		) {
			return this.createFromParams(arg1, arg2, arg3 ?? null);
		}

		throw new InvalidSessionFactoryArgumentsError();
	}

	private isSessionDTO(arg: unknown): arg is TSessionDTO {
		return typeof arg === 'object' && arg !== null && 'clientId' in arg;
	}

	private createFromParams(
		clientId: IClientId,
		userId: Id,
		authToken: string | null,
	): ISession {
		return new Session(clientId, userId, authToken);
	}

	private createNew(): ISession {
		let clientId = this.clientIdFactory.create();
		let user = this.userService.createUser({
			email: '',
			name: '',
		});

		return new Session(clientId, user.id, null);
	}

	private createFromDTO(sessionDTO: TSessionDTO): ISession {
		return new Session(
			this.clientIdFactory.create(sessionDTO.clientId),
			sessionDTO.userId,
			sessionDTO.authToken,
		);
	}
}
