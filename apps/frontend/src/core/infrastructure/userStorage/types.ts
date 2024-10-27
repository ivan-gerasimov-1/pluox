import type { IAppStorage } from '@core/infrastructure/appStorage/types';

export interface IUserStorage extends IAppStorage<TUser> {}

export type TUser = {
	id: string;
	email: string;
};
