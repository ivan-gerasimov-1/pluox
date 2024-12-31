import type { TAppConfig } from '@root/core/modules/settings/appConfig/types';
import type { IDataSource } from '@root/core/infrastructure/dataSource/types';

export interface IAppConfigDataSource extends IDataSource<TAppConfig> {}
