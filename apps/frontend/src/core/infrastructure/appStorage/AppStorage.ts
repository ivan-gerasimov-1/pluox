import { type IAppStorage } from '@core/infrastructure/appStorage/types';
import { type Id } from '@domain/types';

export class AppStorage<T extends {}> implements IAppStorage<T> {
	readonly #ID_PREFIX = '@savee';

	public get(id: string): T | null {
		const rawData = window.localStorage.getItem(this.makeId(id));

		if (rawData === null) {
			return null;
		}

		try {
			return JSON.parse(rawData);
		} catch {
			return null;
		}
	}

	public set(id: string, value: T): void {
		window.localStorage.setItem(this.makeId(id), JSON.stringify(value));
	}

	public clear(id: string): void {
		window.localStorage.removeItem(this.makeId(id));
	}

	private makeId(id: Id): Id {
		return `${this.#ID_PREFIX}/${id}`;
	}
}
