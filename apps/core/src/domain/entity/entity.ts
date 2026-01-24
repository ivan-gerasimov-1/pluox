import type { IEntity } from '@core/domain/entity/types';
import type { TISODateString } from '@core/domain/temporal/types';
import type { Id } from '@core/domain/types';

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
