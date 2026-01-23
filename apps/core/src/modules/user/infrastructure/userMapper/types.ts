import type { IMapper } from '@pluox/core/src/infrastructure/mapper/types';

import type { TUserDTO } from '@pluox/core/src/modules/user/application/dto/userDTO';
import type { IUser } from '@pluox/core/src/modules/user/domain/userEntity/types';

export interface IUserMapper extends IMapper<TUserDTO, IUser> {}
