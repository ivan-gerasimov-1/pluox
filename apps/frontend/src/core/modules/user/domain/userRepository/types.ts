import type { IRepository } from '@/core/domain/repository/types';
import type { Id } from '@/core/domain/types';
import type { IUser } from '@/core/modules/user/domain/userEntity/types';

export interface IUserRepository extends IRepository<IUser, TUserFindOptions> {}

export type TUserFindOptions = {
	id?: Id;
	email?: string;
	name?: string;
};
