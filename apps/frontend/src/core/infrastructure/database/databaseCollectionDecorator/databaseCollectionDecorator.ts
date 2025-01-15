import type { IDatabaseCollection } from '@root/core/infrastructure/database/types';

export class DatabaseCollectionDecorator implements IDatabaseCollection {
	constructor(public decoratee: IDatabaseCollection) {}

	public has(id: string): boolean {
		return this.decoratee.has(id);
	}

	public readOne<T>(id: string): T | null {
		return this.decoratee.readOne(id);
	}

	public readAll<T extends { id: string }>(): T[] {
		return this.decoratee.readAll();
	}

	public writeOne<T>(payload: T & { id: string }): T | null {
		return this.decoratee.writeOne(payload);
	}

	public updateOne<T>(id: string, payload: Partial<T>): T | null {
		return this.decoratee.updateOne(id, payload);
	}

	public removeOne<T>(id: string): T | null {
		return this.decoratee.removeOne(id);
	}

	public drop(): void {
		this.decoratee.drop();
	}
}
