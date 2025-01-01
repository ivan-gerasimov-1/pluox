import type { IEntity } from '@root/core/domain/entity/types';

import type { Id } from '@domain/types';
import type { TISODateString } from '@root/core/infrastructure/temporal/types';

export abstract class Entity<TEntityDTO> implements IEntity<TEntityDTO> {
	readonly #id: Id;

	protected readonly createdAt: TISODateString;
	protected modifiedAt: TISODateString;

	constructor(id: Id, createdAt: TISODateString, modifiedAt?: TISODateString) {
		this.#id = id;

		this.createdAt = createdAt;
		this.modifiedAt = modifiedAt ?? createdAt;
	}

	public get id(): Id {
		return this.#id;
	}

	public abstract toDTO(): TEntityDTO;
}
