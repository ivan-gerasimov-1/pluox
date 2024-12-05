import type { IClientId } from '@core/infrastructure/clientId/types';
import type { IClientIdStorage } from '@core/infrastructure/clientIdStorage/types';
import type { IIdGenerator } from '@core/infrastructure/idGenerator/types';

import type { Id } from '@domain/types';

export class ClientId implements IClientId {
	readonly #clientId: string;

	constructor(
		private readonly idGenerator: IIdGenerator,
		private readonly storage: IClientIdStorage,
	) {
		this.#clientId = storage.read() || this.createId();
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
