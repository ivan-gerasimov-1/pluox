import type { TAppConfig } from '@core/infrastructure/appConfig/types';
import type { IDataSource } from '@core/infrastructure/appStorage/types';

export interface IAppConfigStorage extends IDataSource<TAppConfig> {}
