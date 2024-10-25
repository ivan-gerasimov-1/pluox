import { AppStorage } from '@core/infrastructure/appStorage/AppStorage';
import type { IClientIdStorage } from '@core/infrastructure/clientIdStorage/types';
import type { Id } from '@domain/types';

export class ClientIdStorage
	extends AppStorage<Id>
	implements IClientIdStorage
{
	static #instance: IClientIdStorage;

	static readonly #STORAGE_ID: Id = 'clientId';

	public static getInstance(): IClientIdStorage {
		if (!this.#instance) {
			this.#instance = new ClientIdStorage(this.#STORAGE_ID);
		}

		return this.#instance;
	}
}
