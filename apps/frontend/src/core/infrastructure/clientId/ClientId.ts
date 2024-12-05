import { getGlobalContainer } from '@root/diContainer';

import type { IClientId } from '@core/infrastructure/clientId/types';
import { ClientIdStorage } from '@core/infrastructure/clientIdStorage/ClientIdStorage';
import type { IClientIdStorage } from '@core/infrastructure/clientIdStorage/types';
import type { IIdGenerator } from '@core/infrastructure/idGenerator/types';

import type { Id } from '@domain/types';

import { EServiceToken } from '@modules/serviceContainer/types';

export class ClientId implements IClientId {
	static #instance: IClientId;

	readonly #clientId: string;

	private constructor(
		private readonly idGenerator: IIdGenerator,
		private readonly storage: IClientIdStorage,
	) {
		this.#clientId = storage.read() || this.createId();
	}

	public static getInstance(): IClientId {
		if (!this.#instance) {
			let idGenerator = getGlobalContainer().get(EServiceToken.ID_GENERATOR);
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

		this.storage.create(id);

		return id;
	}
}
