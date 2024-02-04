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

	private readonly STORAGE_ID: string = 'user';

	private constructor() {
		super();
	}

	public static getInstance(): UserStorage {
		if (!this.#instance) {
			this.#instance = new UserStorage();
		}

		return this.#instance;
	}

	public update(payload: { id?: string; email?: string }): void {
		const currentUser = this.get();

		super.set(this.STORAGE_ID, {
			id: '',
			email: '',
			...currentUser,
			...payload,
		});
	}

	public override get(): { id: string; email: string } | null {
		return super.get(this.STORAGE_ID);
	}
}
