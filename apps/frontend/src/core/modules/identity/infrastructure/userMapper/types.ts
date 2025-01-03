import type { IMapper } from '@root/core/infrastructure/mapper/types';
import type { TUserDTO } from '@root/core/modules/identity/application/dto/userDTO';
import type { IUser } from '@root/core/modules/identity/domain/userEntity/types';

export interface IUserMapper extends IMapper<TUserDTO, IUser> {}
