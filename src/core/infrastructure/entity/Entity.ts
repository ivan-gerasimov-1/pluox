import { type Id } from '@domain/types';
import { generateId } from '@utils/id';

export interface IEntity<TEntityDTO> {
	readonly id: Id;

	toObject(): TEntityDTO;
}

export abstract class Entity<TEntityDTO> implements IEntity<TEntityDTO> {
	readonly #id: Id;

	constructor() {
		this.#id = generateId();
	}

	public get id(): Id {
		return this.#id;
	}

	public abstract toObject(): TEntityDTO;
}
