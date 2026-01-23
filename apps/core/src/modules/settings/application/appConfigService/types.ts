import type { TAppConfig } from '@pluox/core/src/modules/settings/domain/appConfig/types';

export interface IAppConfigService {
	initialize(): IAppConfigService;
	update(config: Partial<TAppConfig>): TAppConfig;
}
