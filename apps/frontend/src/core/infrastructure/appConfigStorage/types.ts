import type { TAppConfig } from '@core/infrastructure/appConfig/types';
import type { IDataSource } from '@root/core/infrastructure/dataSource/types';

export interface IAppConfigStorage extends IDataSource<TAppConfig> {}
