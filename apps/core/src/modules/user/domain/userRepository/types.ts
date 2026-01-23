import type { IRepository } from '@pluox/core/src/domain/repository/types';
import type { Id } from '@pluox/core/src/domain/types';

import type { IUser } from '@pluox/core/src/modules/user/domain/userEntity/types';

export interface IUserRepository extends IRepository<IUser, TUserFindOptions> {}

export type TUserFindOptions = {
	id?: Id;
	email?: string;
	name?: string;
};
