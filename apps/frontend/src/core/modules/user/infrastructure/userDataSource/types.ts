import type { IDataSource } from '@root/core/infrastructure/dataSource/types';
import type { TUserDTO } from '@root/core/modules/user/application/dto/userDTO';
import type { TUserFindOptions } from '@root/core/modules/user/domain/userRepository/types';

export interface IUserDataSource
	extends IDataSource<TUserDTO, TUserFindOptions> {}
