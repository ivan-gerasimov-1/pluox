import type { IDatabaseCollection } from '@/core/infrastructure/database/types';

export class DatabaseCollectionDecorator implements IDatabaseCollection {
	constructor(public decoratee: IDatabaseCollection) {}

	public has(id: string): boolean {
		return this.decoratee.has(id);
	}

	public readOne<T>(id: string): T | null {
		return this.decoratee.readOne(id);
	}

	public readAll<T>(): T[] {
		return this.decoratee.readAll();
	}

	public writeOne<T>(id: string, payload: T): T | null {
		return this.decoratee.writeOne(id, payload);
	}

	public updateOne<T>(id: string, payload: Partial<T>): T | null {
		return this.decoratee.updateOne(id, payload);
	}

	public removeOne<T>(id: string): T | null {
		return this.decoratee.removeOne(id);
	}

	public clear(): void {
		this.decoratee.clear();
	}
}
