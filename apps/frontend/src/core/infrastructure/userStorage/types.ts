import type { IAppStorage } from '@core/infrastructure/appStorage/types';

export interface IUserStorage extends IAppStorage<TUser> {
	update(payload: Partial<TUser>): void;
}

export type TUser = {
	id: string;
	email: string;
};
