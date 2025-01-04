import type { ISessionService } from '@root/core/modules/identity/application/sessionService/types';
import type { IUserDataSource } from '@root/core/modules/identity/infrastructure/userDataSource/types';
import type { IUserService } from '@root/core/modules/identity/application/userService/types';
import type { IIdGenerator } from '@root/core/infrastructure/idGenerator/types';
import type { ITemporal } from '@root/core/domain/temporal/types';
import type { IClientIdService } from '@root/core/modules/identity/application/clientIdService/types';
import type { IUserMapper } from '@root/core/modules/identity/infrastructure/userMapper/types';

export class SessionService implements ISessionService {
	constructor(
		private readonly clientIdService: IClientIdService,

		private readonly userService: IUserService,
		private readonly userDataSource: IUserDataSource,
		private readonly userMapper: IUserMapper,
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
			let user = this.userService.createUser({
				email: '',
				name: '',
			});

			let userDTO = this.userMapper.toDTO(user);

			this.userDataSource.create(userDTO);
		}
	}
}
