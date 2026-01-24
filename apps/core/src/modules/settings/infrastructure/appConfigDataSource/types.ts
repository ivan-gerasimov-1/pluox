import type { IDataSource } from '@core/infrastructure/dataSource/types';

import type { TAppConfig } from '@core/modules/settings/domain/appConfig/types';

export interface IAppConfigDataSource extends IDataSource<TAppConfig> {}
