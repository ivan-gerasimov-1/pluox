import type { IDataSource } from '@core/infrastructure/appStorage/types';

export interface IUserStorage extends IDataSource<TUser> {}

export type TUser = {
	id: string;
	email: string;
};
