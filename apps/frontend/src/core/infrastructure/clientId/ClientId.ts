import type { IClientId } from '@core/infrastructure/clientId/types';
import { ClientIdStorage } from '@core/infrastructure/clientIdStorage/ClientIdStorage';
import type { IClientIdStorage } from '@core/infrastructure/clientIdStorage/types';
import { IdGenerator } from '@core/infrastructure/idGenerator/IdGenerator';
import type { IIdGenerator } from '@core/infrastructure/idGenerator/types';
import type { Id } from '@domain/types';

export class ClientId implements IClientId {
	static #instance: IClientId;

	readonly #clientId: string;

	private constructor(
		private readonly idGenerator: IIdGenerator,
		private readonly storage: IClientIdStorage,
	) {
		this.#clientId = storage.getId() || this.createId();
	}

	public static getInstance(): IClientId {
		if (!this.#instance) {
			const idGenerator = IdGenerator.getInstance();
			const storage = ClientIdStorage.getInstance();

			this.#instance = new ClientId(idGenerator, storage);
		}

		return this.#instance;
	}

	public get(): Id {
		return this.#clientId;
	}

	private createId(): Id {
		let id = this.idGenerator.getId();

		this.storage.setId(id);

		return id;
	}
}
