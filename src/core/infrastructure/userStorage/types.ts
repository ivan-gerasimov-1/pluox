import type { IAppStorage } from '@core/infrastructure/appStorage/types';

export interface IUserStorage extends IAppStorage {
	update(payload: { id?: string; email?: string }): void;
	get(): { id: string; email: string } | null;
}
