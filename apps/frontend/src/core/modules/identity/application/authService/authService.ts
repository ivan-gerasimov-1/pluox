import { UserNotFoundError } from '@root/core/modules/identity/application/authService/errors';
import type { IAuthSerivce } from '@root/core/modules/identity/application/authService/types';
import type { ISessionService } from '@root/core/modules/identity/application/sessionService/types';
import type { IUserService } from '@root/core/modules/identity/application/userService/types';
import type { IAuthApi } from '@root/core/modules/identity/infrastructure/authApi/types';

/**
 * @todo
 * 1. Add proper management of users
 */
export class AuthService implements IAuthSerivce {
	constructor(
		private readonly authApi: IAuthApi,
		private readonly userService: IUserService,
		private readonly sessionService: ISessionService,
	) {}

	public async signIn(
		email: string,
		password: string,
	): Promise<{
		email: string;
	}> {
		const result = await this.authApi.signIn(email, password);

		// this.userDataSource.update({
		// 	email: result.email,
		// });

		return {
			email: result.email,
		};
	}

	public async logIn(
		email: string,
		password: string,
	): Promise<{
		id: string;
		email: string;
	}> {
		const result = await this.authApi.logIn(email, password);

		if (!result.id || !result.email) {
			throw new UserNotFoundError();
		}

		this.userService.createUser({
			id: result.id,
			email: result.email,
			name: result.name,
			createdAt: result.createdAt,
			modifiedAt: result.modifiedAt,
		});

		this.sessionService.setAuthToken(result.token);

		return {
			id: result.id,
			email: result.email,
		};
	}

	public async signOut(): Promise<void> {
		this.sessionService.removeAuthToken();
	}
}
