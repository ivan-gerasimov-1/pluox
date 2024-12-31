import type { TAppConfig } from '@root/core/modules/settings/domain/appConfig/types';

export interface IAppConfigService {
	initialize(): IAppConfigService;
	update(config: Partial<TAppConfig>): TAppConfig;
}
