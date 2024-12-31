import { UserNotFoundError } from '@root/core/modules/identity/authService/errors';
import type { IAuthApi } from '@root/core/modules/identity/authApi/types';
import type { IAuthSerivce } from '@root/core/modules/identity/authService/types';
import type { IAuthDataSource } from '@root/core/modules/identity/authDataSource/types';
import type { IUserDataSource } from '@root/core/modules/identity/userDataSource/types';

export class AuthService implements IAuthSerivce {
	constructor(
		private readonly authApi: IAuthApi,
		private readonly authDataSource: IAuthDataSource,
		private readonly userDataSource: IUserDataSource,
	) {}

	public async signIn(
		email: string,
		password: string,
	): Promise<{
		email: string;
	}> {
		const result = await this.authApi.signIn(email, password);

		this.userDataSource.update({
			email: result.email,
		});

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

		this.cleareStorages();

		this.userDataSource.create({
			id: result.id,
			email: result.email,
		});

		this.authDataSource.create(result.token);

		return {
			id: result.id,
			email: result.email,
		};
	}

	public async signOut(): Promise<void> {
		this.cleareStorages();
	}

	public isAuthenticated(): boolean {
		const hasToken = !this.authDataSource.isEmpty();

		return hasToken;
	}

	private cleareStorages(): void {
		this.authDataSource.clean();
		this.userDataSource.clean();
	}
}
