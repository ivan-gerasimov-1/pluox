import type { TAppConfig } from '@core/infrastructure/appConfig/types';
import type { IAppStorage } from '@core/infrastructure/appStorage/types';

export interface IAppConfigStorage extends IAppStorage<TAppConfig> {}
