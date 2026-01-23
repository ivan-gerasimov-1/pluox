import type { IDataSource } from '@pluox/core/src/infrastructure/dataSource/types';

import type { TUserDTO } from '@pluox/core/src/modules/user/application/dto/userDTO';
import type { TUserFindOptions } from '@pluox/core/src/modules/user/domain/userRepository/types';

export interface IUserDataSource
	extends IDataSource<TUserDTO, TUserFindOptions> {}
