import type { IDataSource } from '@root/core/infrastructure/dataSource/types';
import type { TUserDTO } from '@root/core/modules/identity/application/dto/userDTO';

export interface IUserDataSource extends IDataSource<TUserDTO> {}
