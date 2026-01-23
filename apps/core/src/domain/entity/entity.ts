import type { IEntity } from '@pluox/core/src/domain/entity/types';
import type { TISODateString } from '@pluox/core/src/domain/temporal/types';
import type { Id } from '@pluox/core/src/domain/types';

export abstract class Entity implements IEntity {
	readonly #id: Id;

	readonly #createdAt: TISODateString;
	#modifiedAt: TISODateString;

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

	protected touch(): void {
		this.#modifiedAt = new Date().toISOString();
	}
}
