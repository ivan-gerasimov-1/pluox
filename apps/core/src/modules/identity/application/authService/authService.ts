import { InvalidCredentialsError } from '@pluox/core/src/modules/identity/application/authService/errors';
import type { IAuthSerivce } from '@pluox/core/src/modules/identity/application/authService/types';
import type {
	TLogInResponseDTO,
	TSignUpResponseDTO,
} from '@pluox/core/src/modules/identity/application/dto/authDTO';
import type { ISessionService } from '@pluox/core/src/modules/identity/application/sessionService/types';
import type { IAuthApi } from '@pluox/core/src/modules/identity/infrastructure/authApi/types';
import type { IUserService } from '@pluox/core/src/modules/user/application/userService/types';

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

	public async signUp(
		email: string,
		password: string,
	): Promise<TSignUpResponseDTO> {
		const result = await this.authApi.signUp(email, password);

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
	): Promise<TLogInResponseDTO> {
		const result = await this.authApi.logIn(email, password);

		if (!result.id || !result.email) {
			throw new InvalidCredentialsError();
		}

		this.userService.createUser({
			id: result.id,
			email: result.email,
			name: result.name,
			createdAt: result.createdAt,
			modifiedAt: result.modifiedAt,
		});

		this.sessionService.setAccessToken(result.token);

		return {
			id: result.id,
			email: result.email,
		};
	}

	public async logOut(): Promise<void> {
		this.sessionService.removeAccessToken();
	}
}
