import {
	EServiceToken,
	type IModule,
} from '@root/core/infrastructure/serviceContainer/types';

import { ECurrency } from '@root/core/modules/currency/domain/types';
import { ELocaleCode } from '@root/core/modules/intl/domain/enums';
import { AppConfigService } from '@root/core/modules/settings/application/appConfigService/appConfigService';
import { AppConfig } from '@root/core/modules/settings/domain/appConfig/appConfig';
import { appConfigDataSourceFactory } from '@root/core/modules/settings/infrastructure/appConfigDataSource/appConfigDataSourceFactory';

export const settingsModule: IModule = {
	providers: [
		{
			token: EServiceToken.APP_CONFIG,
			useFactory: () => {
				return new AppConfig(ELocaleCode.RU_RU, ECurrency.USD);
			},
		},
		{
			token: EServiceToken.APP_CONFIG_DATASOURCE,
			useFactory: appConfigDataSourceFactory,
			deps: [EServiceToken.DATABASE],
		},
		{
			token: EServiceToken.APP_CONFIG_SERVICE,
			useClass: AppConfigService,
			deps: [EServiceToken.APP_CONFIG, EServiceToken.APP_CONFIG_DATASOURCE],
		},
	],
};
