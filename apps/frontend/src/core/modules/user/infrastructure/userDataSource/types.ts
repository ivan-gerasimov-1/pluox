import type { IDataSource } from '@/core/infrastructure/dataSource/types';

import type { TUserDTO } from '@/core/modules/user/application/dto/userDTO';
import type { TUserFindOptions } from '@/core/modules/user/domain/userRepository/types';

export interface IUserDataSource
	extends IDataSource<TUserDTO, TUserFindOptions> {}
