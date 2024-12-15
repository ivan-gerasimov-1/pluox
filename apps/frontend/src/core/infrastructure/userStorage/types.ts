import type { IDataSource } from '@root/core/infrastructure/dataSource/types';

export interface IUserStorage extends IDataSource<TUser> {}

export type TUser = {
	id: string;
	email: string;
};
