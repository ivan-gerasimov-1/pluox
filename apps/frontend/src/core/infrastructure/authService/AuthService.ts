import { UserNotFoundError } from '@core/infrastructure/authService/errors';
import type { IAuthApi } from '@core/infrastructure/authApi/types';
import type { IAuthSerivce } from '@core/infrastructure/authService/types';
import type { IAuthStorage } from '@core/infrastructure/authStorage/types';
import type { IUserStorage } from '@core/infrastructure/userStorage/types';

export class AuthService implements IAuthSerivce {
	constructor(
		private readonly authApi: IAuthApi,
		private readonly authStorage: IAuthStorage,
		private readonly userStorage: IUserStorage,
	) {}

	public async signIn(
		email: string,
		password: string,
	): Promise<{
		email: string;
	}> {
		const result = await this.authApi.signIn(email, password);

		this.userStorage.update({
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

		this.userStorage.create({
			id: result.id,
			email: result.email,
		});

		this.authStorage.create(result.token);

		return {
			id: result.id,
			email: result.email,
		};
	}

	public async signOut(): Promise<void> {
		this.cleareStorages();
	}

	public isAuthenticated(): boolean {
		const hasToken = !this.authStorage.isEmpty();

		return hasToken;
	}

	private cleareStorages(): void {
		this.authStorage.clean();
		this.userStorage.clean();
	}
}
