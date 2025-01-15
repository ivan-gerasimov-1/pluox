import type { ICustomCollection } from '@root/core/infrastructure/customStorage/types';

import { deepMerge } from '@root/core/infrastructure/customStorage/deepMerge';
import { parseSafeToObject } from '@root/core/infrastructure/customStorage/parseSafe';

export class CustomCollection implements ICustomCollection {
	private readonly id: string;

	constructor(
		private readonly storage: Storage,
		options: {
			id: string;
		},
	) {
		this.id = options.id;
	}

	public readData(): any {
		const rawData = this.storage.getItem(this.id);

		if (rawData === null) {
			return {};
		}

		return parseSafeToObject(rawData);
	}

	public writeData<T>(data: T): void {
		this.storage.setItem(this.id, JSON.stringify(data));
	}

	public has(id: string): boolean {
		let data = this.readData();
		let item = data[id];

		return Boolean(item);
	}

	public readOne<T>(id: string): T | null {
		let data = this.readData();

		return data[id] ?? null;
	}

	public readAll<T>(): T[] {
		let data = this.readData();

		return Object.values(data);
	}

	public writeOne<T>(payload: T & { id: string }): T | null {
		let data = this.readData();
		let item = data[payload.id];

		if (item) {
			return null;
		}

		Reflect.set(data, payload.id, payload);

		this.writeData(data);

		return item;
	}

	public updateOne<T>(id: string, payload: Partial<T>): T | null {
		let data = this.readData();
		let item = data[id];

		if (item === null) {
			return null;
		}

		Reflect.set(data, id, deepMerge(item, payload));

		this.writeData(data);

		return item;
	}

	public removeOne<T>(id: string): T | null {
		let data = this.readData();
		let item = data[id];

		if (!item) {
			return null;
		}

		Reflect.deleteProperty(data, id);

		this.writeData(data);

		return item;
	}

	public clearData(): void {
		this.storage.removeItem(this.id);
	}
}
