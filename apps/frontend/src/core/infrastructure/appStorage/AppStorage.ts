import { type IAppStorage } from '@core/infrastructure/appStorage/types';
import { type Id } from '@domain/types';

import { deepMerge } from '@core/infrastructure/appStorage/deepMerge';

export class AppStorage<T extends {}> implements IAppStorage<T> {
	readonly #ID_PREFIX = '@savee';

	readonly #id: string;

	constructor(storageId: string) {
		this.#id = this.makeId(storageId);
	}

	public create(payload: T): void {
		let isEmpty = this.isEmpty();

		if (!isEmpty) {
			throw new Error('Storage already exists');
		}

		window.localStorage.setItem(this.#id, JSON.stringify(payload));
	}

	public read(): T | null {
		const rawData = this.readRaw();

		if (rawData === null) {
			return null;
		}

		return this.parse(rawData);
	}

	/**
	 * @todo Restore isEmpty check
	 */
	public update(payload: Partial<T>): void {
		/* let isEmpty = this.isEmpty();

		if (isEmpty) {
			throw new Error('Storage is empty, initialize it first');
		} */

		let data = deepMerge(this.read(), payload);

		window.localStorage.setItem(this.#id, JSON.stringify(data));
	}

	public delete(): void {
		window.localStorage.removeItem(this.#id);
	}

	public isEmpty(): boolean {
		let rawData = this.readRaw();
		let isEmpty = rawData === null;

		return isEmpty;
	}

	private readRaw(): string | null {
		return window.localStorage.getItem(this.#id);
	}

	private parse(payload: string): T | null {
		try {
			return JSON.parse(payload);
		} catch {
			return null;
		}
	}

	private makeId(id: Id): Id {
		return `${this.#ID_PREFIX}/${id}`;
	}
}
