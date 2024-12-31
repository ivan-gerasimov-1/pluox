import type { IDataSource } from '@root/core/infrastructure/dataSource/types';
import type { Id } from '@domain/types';

import { deepMerge } from '@root/core/infrastructure/dataSource/deepMerge';

export class LocalStorageDataSource<T extends {}> implements IDataSource<T> {
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

	/**
	 * @todo Restore isEmpty check and remove default value for this.read()
	 */
	public update(payload: Partial<T>): void {
		/* let isEmpty = this.isEmpty();

		if (isEmpty) {
			throw new Error('Storage is empty, initialize it first');
		} */

		let prevData = this.read() ?? {};
		let data = deepMerge(prevData, payload);

		window.localStorage.setItem(this.#id, JSON.stringify(data));
	}

	public read(): T | null {
		const rawData = this.readRaw();

		if (rawData === null) {
			return null;
		}

		return this.parseSafe(rawData);
	}

	public clear(): void {
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

	private parseSafe(payload: string): T | null {
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
