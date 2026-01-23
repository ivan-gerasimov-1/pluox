import type { IDataSource } from '@pluox/core/src/infrastructure/dataSource/types';

import type { TSessionDTO } from '@pluox/core/src/modules/identity/application/dto/sessionDTO';

export interface ISessionDataSource extends IDataSource<TSessionDTO> {}
