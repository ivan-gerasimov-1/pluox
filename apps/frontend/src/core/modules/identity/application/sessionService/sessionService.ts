import type { ISessionService } from '@root/core/modules/identity/application/sessionService/types';
import type { IUserDataSource } from '@root/core/modules/identity/infrastructure/userDataSource/types';
import type { IUserService } from '@root/core/modules/identity/application/userService/types';
import type { IIdGenerator } from '@root/core/infrastructure/idGenerator/types';
import type { ITemporal } from '@root/core/infrastructure/temporal/types';
import type { IClientIdService } from '@root/core/modules/identity/application/clientIdService/types';

export class SessionService implements ISessionService {
	constructor(
		private readonly clientIdService: IClientIdService,

		private readonly userService: IUserService,
		private readonly userDataSource: IUserDataSource,

		private readonly idGenerator: IIdGenerator,
		private readonly temporal: ITemporal,
	) {}

	public start(): void {
		// Check client id
		this.checkClientId();

		// Check user
		this.checkUser();
	}

	private checkClientId(): void {
		this.clientIdService.createClientId();
	}

	private checkUser(): void {
		let userDto = this.userDataSource.read();

		if (userDto) {
			this.userService.createUser(userDto);
		} else {
			let id = this.idGenerator.getId();
			let currentDate = this.temporal.getISODateString();

			let user = this.userService.createUser({
				id,
				email: '',
				name: '',
				createdAt: currentDate,
				modifiedAt: currentDate,
			});

			let userDTO = user.toDTO();

			this.userDataSource.create(userDTO);
		}
	}
}
