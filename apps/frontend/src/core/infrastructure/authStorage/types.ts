import { IAppStorage } from '@core/infrastructure/appStorage/types';

export interface IAuthStorage extends IAppStorage {
	set(payload: string): void;
	get(): string | null;
	clear(): void;
}
