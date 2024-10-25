import { type IAppStorage } from '@core/infrastructure/appStorage/types';
import { type Id } from '@domain/types';

export class AppStorage<T extends {}> implements IAppStorage<T> {
	readonly #ID_PREFIX = '@savee';

	readonly #storageId: string;

	constructor(storageId: string) {
		this.#storageId = storageId;
	}

	public get id(): string {
		return this.makeId(this.#storageId);
	}

	public get(): T | null {
		const rawData = window.localStorage.getItem(this.id);

		if (rawData === null) {
			return null;
		}

		try {
			return JSON.parse(rawData);
		} catch {
			return null;
		}
	}

	public set(payload: T): void {
		window.localStorage.setItem(this.id, JSON.stringify(payload));
	}

	public clear(): void {
		window.localStorage.removeItem(this.id);
	}

	private makeId(id: Id): Id {
		return `${this.#ID_PREFIX}/${id}`;
	}
}
