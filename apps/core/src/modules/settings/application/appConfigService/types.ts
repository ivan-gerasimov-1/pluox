import type { TAppConfig } from '@core/modules/settings/domain/appConfig/types';

export interface IAppConfigService {
	initialize(): IAppConfigService;
	update(config: Partial<TAppConfig>): TAppConfig;
}
