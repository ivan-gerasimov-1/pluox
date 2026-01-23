import {
	EServiceToken,
	type IModule,
} from '@pluox/core/src/infrastructure/serviceContainer/types';

import { ECurrency } from '@pluox/core/src/modules/currency/domain/types';
import { ELocaleCode } from '@pluox/core/src/modules/intl/domain/enums';
import { AppConfigService } from '@pluox/core/src/modules/settings/application/appConfigService/appConfigService';
import { AppConfig } from '@pluox/core/src/modules/settings/domain/appConfig/appConfig';
import { appConfigDataSourceFactory } from '@pluox/core/src/modules/settings/infrastructure/appConfigDataSource/appConfigDataSourceFactory';

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
