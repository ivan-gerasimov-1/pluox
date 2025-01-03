import type { IEntity } from '@root/core/domain/entity/types';

import type { Id } from '@domain/types';
import type { TISODateString } from '@root/core/infrastructure/temporal/types';

export abstract class Entity implements IEntity {
	readonly #id: Id;

	readonly #createdAt: TISODateString;
	readonly #modifiedAt: TISODateString;

	constructor(id: Id, createdAt: TISODateString, modifiedAt?: TISODateString) {
		this.#id = id;

		this.#createdAt = createdAt;
		this.#modifiedAt = modifiedAt ?? createdAt;
	}

	public get id(): Id {
		return this.#id;
	}

	public get createdAt(): TISODateString {
		return this.#createdAt;
	}

	public get modifiedAt(): TISODateString {
		return this.#modifiedAt;
	}
}
