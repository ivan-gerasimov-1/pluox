import type { IDataSource } from '@root/core/infrastructure/dataSource/types';
import type { TSessionDTO } from '@root/core/modules/identity/application/dto/sessionDTO';

export interface ISessionDataSource extends IDataSource<TSessionDTO> {}
