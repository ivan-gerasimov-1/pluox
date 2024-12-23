import type { IClientId } from '@core/infrastructure/clientId/types';
import type { IClientIdDataSource } from '@root/core/infrastructure/clientIdDataSource/types';
import type { IIdGenerator } from '@core/infrastructure/idGenerator/types';

import type { Id } from '@domain/types';

export class ClientId implements IClientId {
	readonly #clientId: string;

	constructor(
		private readonly idGenerator: IIdGenerator,
		private readonly dataSource: IClientIdDataSource,
	) {
		this.#clientId = dataSource.read() || this.createId();
	}

	public get(): Id {
		return this.#clientId;
	}

	private createId(): Id {
		let id = this.idGenerator.getId();

		this.dataSource.create(id);

		return id;
	}
}
