import type { IAppStorage } from '@core/infrastructure/appStorage/types';

export interface IUserStorage
	extends IAppStorage<{ id: string; email: string }> {
	update(payload: { id?: string; email?: string }): void;
}
