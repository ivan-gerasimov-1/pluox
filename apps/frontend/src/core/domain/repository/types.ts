import type { Id } from '@root/core/domain/types';

export interface IRepository<TEntity, TCreateDTO, TUpdateDTO, TFindOptions> {
	/**
	 * @description
	 * Creates a new entity
	 */
	create(entityCreateDTO: TCreateDTO): TEntity;

	/**
	 * @description
	 * Updates an existing entity
	 * @returns Updated entity or null if not found
	 */
	update(id: Id, entityUpdateDTO: TUpdateDTO): TEntity | null;

	/**
	 * @description
	 * Finds multiple entities with pagination
	 */
	findMany(options?: TFindManyOptions<TFindOptions>): TFindManyResult<TEntity>;
	/**
	 * @description
	 * Finds a single entity by query
	 * @returns Entity or null if not found
	 */
	findOne(options: TFindOptions): TEntity | null;
	/**
	 * @description
	 * Finds a single entity by id
	 * @returns Entity or null if not found
	 */
	findById(id: Id): TEntity | null;

	/**
	 * @description
	 * Removes an entity by id
	 * @returns Removed entity or null if not found
	 */
	remove(id: Id): TEntity | null;
}

export type TFindManyOptions<T> = T & {
	limit?: number;
	offset?: number;
};

export type TFindManyResult<T> = {
	items: T[];
	total: number;
};
