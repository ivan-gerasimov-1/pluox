import type { IDataSource } from '@pluox/core/src/infrastructure/dataSource/types';

import type { TAppConfig } from '@pluox/core/src/modules/settings/domain/appConfig/types';

export interface IAppConfigDataSource extends IDataSource<TAppConfig> {}
