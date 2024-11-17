import { type IEntity } from '@core/infrastructure/entity/types';
import type { TISODateString, Id } from '@domain/types';
import { IdGenerator } from '@core/infrastructure/idGenerator/IdGenerator';

export abstract class Entity<TEntityDTO> implements IEntity<TEntityDTO> {
	#id: Id;

	protected readonly createdAt: TISODateString;
	protected modifiedAt: TISODateString;

	constructor() {
		let idGenerator = IdGenerator.getInstance();
		let currentDate = new Date().toISOString();

		this.#id = idGenerator.getId();

		this.createdAt = currentDate;
		this.modifiedAt = currentDate;
	}

	public get id(): Id {
		return this.#id;
	}

	protected set id(value: Id) {
		this.#id = value;
	}

	public abstract toObject(): TEntityDTO;
}
