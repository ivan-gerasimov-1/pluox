import type { IDataSource } from '@/core/infrastructure/dataSource/types';
import type { TSessionDTO } from '@/core/modules/identity/application/dto/sessionDTO';

export interface ISessionDataSource extends IDataSource<TSessionDTO> {}
