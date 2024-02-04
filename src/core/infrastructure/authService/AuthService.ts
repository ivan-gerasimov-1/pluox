import { AuthApi } from '@core/infrastructure/authApi/AuthApi';
import type { IAuthApi } from '@core/infrastructure/authApi/types';
import { UserNotFoundError } from '@core/infrastructure/authService/errors';
import type { IAuthSerivce } from '@core/infrastructure/authService/types';
import { AuthStorage } from '@core/infrastructure/authStorage/AuthStorage';
import type { IAuthStorage } from '@core/infrastructure/authStorage/types';
import { UserStorage } from '@core/infrastructure/userStorage/UserStorage';
import type { IUserStorage } from '@core/infrastructure/userStorage/types';

export class AuthService implements IAuthSerivce {
	static #instance: IAuthSerivce;

	private constructor(
		private readonly authApi: IAuthApi,
		private readonly authStorage: IAuthStorage,
		private readonly userStorage: IUserStorage,
	) {}

	public static getInstance(): IAuthSerivce {
		if (!this.#instance) {
			const authStorage = AuthStorage.getInstance();
			const userStorage = UserStorage.getInstance();
			const authApi = AuthApi.getInstance();

			this.#instance = new AuthService(authApi, authStorage, userStorage);
		}

		return this.#instance;
	}

	public async signIn(
		email: string,
		password: string,
	): Promise<{
		email: string;
	}> {
		const result = await this.authApi.signIn(email, password);

		this.userStorage.update({
			email,
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

		this.userStorage.update({
			id: result.id || '',
			email: result.email || '',
		});

		this.authStorage.set(result.token);

		return {
			id: result.id || '',
			email: result.email || '',
		};
	}

	public async signOut(): Promise<void> {
		this.authStorage.set('');
		this.userStorage.update({
			id: '',
			email: '',
		});
	}

	public check(): boolean {
		const hasToken = this.authStorage.get();

		return !!hasToken;
	}
}
