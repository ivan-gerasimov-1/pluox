import type { IMapper } from '@/core/infrastructure/mapper/types';

import type { TUserDTO } from '@/core/modules/user/application/dto/userDTO';
import type { IUser } from '@/core/modules/user/domain/userEntity/types';

export interface IUserMapper extends IMapper<TUserDTO, IUser> {}
