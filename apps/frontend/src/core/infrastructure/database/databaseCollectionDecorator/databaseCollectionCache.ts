import { DatabaseCollectionDecorator } from '@root/core/infrastructure/database/databaseCollectionDecorator/databaseCollectionDecorator';
import type { IDatabaseCollection } from '@root/core/infrastructure/database/types';

export class DatabaseCollectionCacheDecorator
	extends DatabaseCollectionDecorator
	implements IDatabaseCollection
{
	private readonly DEFAULT_ID = 'data';

	private isCacheComplete: boolean;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	private cache: Map<string, any>;

	constructor(decoratee: IDatabaseCollection) {
		super(decoratee);

		this.cache = new Map();
		this.isCacheComplete = false;
	}

	public has(id: string): boolean {
		if (this.hasCache(id)) {
			return true;
		}

		return this.decoratee.has(id);
	}

	public readOne<T>(id: string): T | null {
		if (this.hasCache(id)) {
			return this.readCache(id);
		}

		let result = this.decoratee.readOne<T>(id);

		if (result !== null) {
			this.writeCache(id, result);
		}

		return result;
	}

	public readAll<T>(): T[] {
		if (this.isCacheComplete) {
			return this.readCache();
		}

		let result = this.decoratee.readAll<T>();

		for (let item of result) {
			let id = this.getItemId(item);

			this.writeCache(id, item);
		}

		this.isCacheComplete = true;

		return result;
	}

	public writeOne<T>(id: string, payload: T): T | null {
		let result = this.decoratee.writeOne(id, payload);

		if (result === null) {
			this.clearCache(id);
		} else {
			this.writeCache(id, result);
		}

		return result;
	}

	public updateOne<T>(id: string, payload: Partial<T>): T | null {
		let result = this.decoratee.updateOne<T>(id, payload);

		if (result === null) {
			this.clearCache(id);
		} else {
			this.writeCache(id, result);
		}

		return result;
	}

	public removeOne<T>(id: string): T | null {
		let result = this.decoratee.removeOne<T>(id);

		this.clearCache(id);

		return result;
	}

	public clear(): void {
		this.decoratee.clear();

		this.clearCache();
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	private writeCache(id: string, payload: any): void {
		this.cache.set(id, payload);
	}

	private readCache<T>(): T[];
	private readCache<T>(id: string): T;
	private readCache<T>(id?: string): T | T[] {
		if (id) {
			return this.cache.get(id);
		}

		return Array.from(this.cache.values());
	}

	private hasCache(id: string): boolean {
		return this.cache.has(id);
	}

	private clearCache(): void;
	private clearCache(id: string): void;
	private clearCache(id?: string): void {
		if (id) {
			this.cache.delete(id);

			return;
		}

		this.cache.clear();
		this.isCacheComplete = false;
	}

	private getItemId<T>(item: T): string {
		if (this.hasId(item)) {
			return item.id;
		}

		return this.DEFAULT_ID;
	}

	private hasId<T>(item: T): item is T & { id: string } {
		if (typeof item !== 'object') {
			return false;
		}

		if (item === null) {
			return false;
		}

		return Reflect.has(item, 'id');
	}
}
