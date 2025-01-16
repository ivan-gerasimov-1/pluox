import {
	EServiceToken,
	type IModule,
} from '@root/core/infrastructure/serviceContainer/types';

import { LaunchControl } from '@root/core/modules/bootstrap/application/launchControl/launchControl';

export const bootstrapModule: IModule = {
	providers: [
		{
			token: EServiceToken.LAUNCH_CONTROL,
			useClass: LaunchControl,
			deps: [
				EServiceToken.SESSION_SERVICE,
				EServiceToken.APP_CONFIG_SERVICE,
				EServiceToken.CURRENCY_RATE_API,
				EServiceToken.CURRENCY_RATE_DATASOURCE,
				EServiceToken.CATEGORY_USE_CASE,
			],
		},
	],
};
