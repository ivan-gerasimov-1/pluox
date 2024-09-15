import { AppStorage } from '@core/infrastructure/appStorage/AppStorage';
import { IAuthStorage } from '@core/infrastructure/authStorage/types';

export class AuthStorage extends AppStorage<string> implements IAuthStorage {
	static #instance: AuthStorage;

	private readonly STORAGE_ID: string = 'token';

	private constructor() {
		super();
	}

	public static getInstance(): AuthStorage {
		if (!this.#instance) {
			this.#instance = new AuthStorage();
		}

		return this.#instance;
	}

	public override set(payload: string): void {
		super.set(this.STORAGE_ID, payload);
	}

	public override get(): string | null {
		return super.get(this.STORAGE_ID);
	}

	public override clear(): void {
		return super.clear(this.STORAGE_ID);
	}
}
