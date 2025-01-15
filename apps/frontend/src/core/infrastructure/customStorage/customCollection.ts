import { parseSafeToObject } from '@root/core/infrastructure/customStorage/parseSafe';
import type { ICustomCollection } from '@root/core/infrastructure/customStorage/types';

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

	public clearData(): void {
		this.storage.removeItem(this.id);
	}
}
