import type { Id } from '@root/core/domain/types';

export interface IRepository<TEntity, TFindOptions> {
	/**
	 * @description
	 * Saves a domain object to the storage.
	 * If the object is new, it creates it; if it already exists, it updates it.
	 * @returns The saved domain object
	 */
	save(entity: TEntity): TEntity;

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
};

export type TFindManyResult<T> = {
	items: T[];
	total: number;
};
