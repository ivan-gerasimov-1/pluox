import { AppStorage } from '@core/infrastructure/appStorage/AppStorage';
import type {
	IUserStorage,
	TUser,
} from '@core/infrastructure/userStorage/types';

export class UserStorage extends AppStorage<TUser> implements IUserStorage {
	static #instance: UserStorage;

	static readonly STORAGE_ID: string = 'user';

	public static getInstance(): IUserStorage {
		if (!this.#instance) {
			this.#instance = new UserStorage(this.STORAGE_ID);
		}

		return this.#instance;
	}

	public update(payload: Partial<TUser>): void {
		const currentUser = this.get();

		super.set({
			id: '',
			email: '',
			...currentUser,
			...payload,
		});
	}
}
