import { type IEntity } from '@core/infrastructure/entity/types';
import { type Id } from '@domain/types';
import { IdGenerator } from '@core/infrastructure/idGenerator/IdGenerator';

export abstract class Entity<TEntityDTO> implements IEntity<TEntityDTO> {
	readonly #id: Id;

	constructor() {
		let idGenerator = IdGenerator.getInstance();

		this.#id = idGenerator.getId();
	}

	public get id(): Id {
		return this.#id;
	}

	public abstract toObject(): TEntityDTO;
}
