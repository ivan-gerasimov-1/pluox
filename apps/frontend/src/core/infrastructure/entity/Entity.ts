import { type IEntity } from '@core/infrastructure/entity/types';
import type { TISODateString, Id } from '@domain/types';
import { IdGenerator } from '@core/infrastructure/idGenerator/IdGenerator';

export abstract class Entity<TEntityDTO> implements IEntity<TEntityDTO> {
	readonly #id: Id;

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

	public abstract toObject(): TEntityDTO;

	/**
	 * @todo Remove public setter when server sync is ready
	 */
	private __dangerouslyUpdateId(value: Id): this {
		// @ts-expect-error
		this.#id = value;

		return this;
	}
}
