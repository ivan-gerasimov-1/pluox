import type { TAppConfig } from '@root/core/modules/settings/domain/appConfig/types';
import type { IDataSource } from '@root/core/infrastructure/dataSource/types';

export interface IAppConfigDataSource extends IDataSource<TAppConfig> {}
