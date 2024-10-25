import { AppStorage } from '@core/infrastructure/appStorage/AppStorage';
import { IAuthStorage } from '@core/infrastructure/authStorage/types';

export class AuthStorage extends AppStorage<string> implements IAuthStorage {
	static #instance: IAuthStorage;

	static readonly #STORAGE_ID: string = 'token';

	public static getInstance(): IAuthStorage {
		if (!this.#instance) {
			this.#instance = new AuthStorage(this.#STORAGE_ID);
		}

		return this.#instance;
	}
}
