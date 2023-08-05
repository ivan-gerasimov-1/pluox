import { type IStorage } from '@core/infrastructure/storage/types';

export class Storage implements IStorage {
	public get(id: string): Record<string, any> | null {
		const rawData = window.localStorage.getItem(id);

		if (rawData === null) {
			return null;
		}

		try {
			return JSON.parse(rawData);
		} catch {
			return null;
		}
	}

	public set(id: string, value: any): void {
		window.localStorage.setItem(id, JSON.stringify(value));
	}
}
