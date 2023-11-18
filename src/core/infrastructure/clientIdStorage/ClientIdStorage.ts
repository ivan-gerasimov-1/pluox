import { AppStorage } from '@core/infrastructure/appStorage/AppStorage';
import type { IClientIdStorage } from '@core/infrastructure/clientIdStorage/types';
import type { Id } from '@domain/types';

export class ClientIdStorage
	extends AppStorage<Id>
	implements IClientIdStorage
{
	static #instance: ClientIdStorage;

	private readonly STORAGE_ID: Id = 'clientId';

	private constructor() {
		super();
	}

	public static getInstance(): IClientIdStorage {
		if (!this.#instance) {
			this.#instance = new ClientIdStorage();
		}

		return this.#instance;
	}

	public setId(clientId: Id): this {
		super.set(this.STORAGE_ID, clientId);

		return this;
	}

	public getId(): Id | null {
		return super.get(this.STORAGE_ID);
	}
}
