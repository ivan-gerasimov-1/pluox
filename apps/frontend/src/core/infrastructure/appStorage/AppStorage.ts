import { type IAppStorage } from '@core/infrastructure/appStorage/types';
import { type Id } from '@domain/types';

export class AppStorage<T extends {}> implements IAppStorage<T> {
	readonly #ID_PREFIX = '@savee';

	readonly #id: string;

	constructor(storageId: string) {
		this.#id = this.makeId(storageId);
	}

	public create(payload: T): void {
		let isEmpty = this.isEmpty();

		if (!isEmpty) {
			throw new Error('Already exists');
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
	 * @todo
	 * 1. Add DeepMerge in order to avoid overriding this method in other instances
	 * 2. Make payload Partial<T>
	 */
	public update(payload: T): void {
		let isEmpty = this.isEmpty();

		if (isEmpty) {
			throw new Error('Not Found');
		}

		window.localStorage.setItem(this.#id, JSON.stringify(payload));
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
