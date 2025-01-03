import type { IRepository } from '@root/core/domain/repository/types';
import type { Id } from '@root/core/domain/types';
import type { IUser } from '@root/core/modules/identity/domain/userEntity/types';

export interface IUserRepository extends IRepository<IUser, TUserFindOptions> {}

export type TUserFindOptions = {
	id?: Id;
	email?: string;
	name?: string;
};
