import type { IClientIdService } from '@root/core/modules/identity/application/clientIdService/types';
import type { ISessionService } from '@root/core/modules/identity/application/sessionService/types';
import type { IUserService } from '@root/core/modules/identity/application/userService/types';

export class SessionService implements ISessionService {
	constructor(
		private readonly clientIdService: IClientIdService,
		private readonly userService: IUserService,
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
		let mainUserDTO = this.userService.getMainUser();

		if (mainUserDTO) {
			return;
		}

		this.userService.createUser({
			email: '',
			name: '',
		});
	}
}
