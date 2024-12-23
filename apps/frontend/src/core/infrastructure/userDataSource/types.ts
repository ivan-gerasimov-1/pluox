import type { IDataSource } from '@root/core/infrastructure/dataSource/types';

export interface IUserDataSource extends IDataSource<TUser> {}

export type TUser = {
	id: string;
	email: string;
};
