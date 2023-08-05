import { type IEntity } from '@core/infrastructure/entity/types';
import { type Id } from '@domain/types';
import { IdGenerator } from '@core/infrastructure/id/IdGenerator';

export abstract class Entity<TEntityDTO> implements IEntity<TEntityDTO> {
	readonly #id: Id;

	constructor() {
		let idGenerator = IdGenerator.create();

		this.#id = idGenerator.getId();
	}

	public get id(): Id {
		return this.#id;
	}

	public abstract toObject(): TEntityDTO;
}
