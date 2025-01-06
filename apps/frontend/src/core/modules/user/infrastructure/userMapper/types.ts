import type { IMapper } from '@root/core/infrastructure/mapper/types';
import type { TUserDTO } from '@root/core/modules/user/application/dto/userDTO';
import type { IUser } from '@root/core/modules/user/domain/userEntity/types';

export interface IUserMapper extends IMapper<TUserDTO, IUser> {}
