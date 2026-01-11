import { deepMerge } from '@/core/infrastructure/database/deepMerge';
import { parseSafeToObject } from '@/core/infrastructure/database/parseSafe';
import type {
	IDatabaseCollection,
	IStorage,
} from '@/core/infrastructure/database/types';

export class DatabaseCollection implements IDatabaseCollection {
	private readonly id: string;

	constructor(
		private readonly storage: IStorage,
		options: {
			id: string;
		},
	) {
		this.id = options.id;
	}

	public has(id: string): boolean {
		let data = this.readData();
		let item = Reflect.get(data, id);

		return Boolean(item);
	}

	public readOne<T>(id: string): T | null {
		let data = this.readData();

		return Reflect.get(data, id) ?? null;
	}

	public readAll<T>(): T[] {
		let data = this.readData();

		return Object.values(data);
	}

	public writeOne<T>(id: string, payload: T): T | null {
		let data = this.readData();
		let item = Reflect.get(data, id);

		if (item) {
			return null;
		}

		Reflect.set(data, id, payload);

		this.writeData(data);

		return payload;
	}

	public updateOne<T>(id: string, payload: Partial<T>): T | null {
		let data = this.readData();
		let item = Reflect.get(data, id);

		if (item === null) {
			return null;
		}

		Reflect.set(data, id, deepMerge(item, payload));

		this.writeData(data);

		return item;
	}

	public removeOne<T>(id: string): T | null {
		let data = this.readData();
		let item = Reflect.get(data, id);

		if (!item) {
			return null;
		}

		Reflect.deleteProperty(data, id);

		this.writeData(data);

		return item;
	}

	public clear(): void {
		this.storage.removeItem(this.id);
	}

	protected readData<T extends {}>(): T {
		const rawData = this.storage.getItem(this.id);

		if (rawData === null) {
			return {} as T;
		}

		return parseSafeToObject(rawData) as T;
	}

	protected writeData<T>(data: T): void {
		this.storage.setItem(this.id, JSON.stringify(data));
	}
}
