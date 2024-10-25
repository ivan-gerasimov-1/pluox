import { AppStorage } from '@core/infrastructure/appStorage/AppStorage';
import { IUserStorage } from '@core/infrastructure/userStorage/types';

export class UserStorage
	extends AppStorage<{
		id: string;
		email: string;
	}>
	implements IUserStorage
{
	static #instance: UserStorage;

	static readonly STORAGE_ID: string = 'user';

	public static getInstance(): UserStorage {
		if (!this.#instance) {
			this.#instance = new UserStorage(this.STORAGE_ID);
		}

		return this.#instance;
	}

	public update(payload: { id?: string; email?: string }): void {
		const currentUser = this.get();

		super.set({
			id: '',
			email: '',
			...currentUser,
			...payload,
		});
	}
}
