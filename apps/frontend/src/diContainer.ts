import { Environment } from '@root/core/modules/settings/infrastructure/environment/environment';

import { containerFactory } from '@root/core/infrastructure/serviceContainer/containerFactory';
import {
	EServiceToken,
	type IModule,
} from '@root/core/infrastructure/serviceContainer/types';

import { Temporal } from '@root/core/infrastructure/temporal/temporal';

import {
	IdGeneratorFactory,
	type IIdGeneratorFactory,
} from '@core/infrastructure/idGenerator/factory';

import { ApiClient } from '@root/core/infrastructure/apiClient/apiClient';
import { ApiClientConfigProvider } from '@root/core/infrastructure/apiClient/configProvider';

import { bootstrapModule } from '@root/core/modules/bootstrap/bootstrap.module';
import { categoryModule } from '@root/core/modules/category/category.module';
import { currencyModule } from '@root/core/modules/currency/currency.module';
import { expenseModule } from '@root/core/modules/expense/expense.module';
import { identityModule } from '@root/core/modules/identity/identity.module';
import { settingsModule } from '@root/core/modules/settings/settings.module';
import { syncModule } from '@root/core/modules/sync/sync.module';
import { userModule } from '@root/core/modules/user/user.module';
import { venueModule } from '@root/core/modules/venue/venue.module';
import { intlModule } from '@root/core/modules/intl/intl.module';

export function createDIContainer(options?: {
	isGlobal?: boolean;
	isDevelopment?: boolean;
}) {
	let container = containerFactory(options);

	return container
		.registerModule(sharedModule)
		.registerModule(bootstrapModule)
		.registerModule(expenseModule)
		.registerModule(categoryModule)
		.registerModule(venueModule)
		.registerModule(syncModule)
		.registerModule(currencyModule)
		.registerModule(userModule)
		.registerModule(settingsModule)
		.registerModule(identityModule)
		.registerModule(intlModule)
		.seal();
}

const sharedModule: IModule = {
	providers: [
		{
			token: EServiceToken.PROCESS_ENV,
			useValue: process.env,
		},

		{
			token: EServiceToken.ENVIRONMENT,
			useClass: Environment,
			deps: [EServiceToken.PROCESS_ENV],
		},

		{
			token: EServiceToken.GLOBAL,
			useValue: window,
		},
		{
			token: EServiceToken.LOCAL_STORAGE,
			useFactory: (global: Window) => global.localStorage,
			deps: [EServiceToken.GLOBAL],
		},

		{
			token: EServiceToken.ID_GENERATOR_FACTORY,
			useClass: IdGeneratorFactory,
		},
		{
			token: EServiceToken.ID_GENERATOR,
			useFactory: (idGeneratorFactory: IIdGeneratorFactory) => {
				return idGeneratorFactory.create();
			},
			deps: [EServiceToken.ID_GENERATOR_FACTORY],
		},

		{
			token: EServiceToken.API_CLIENT,
			useClass: ApiClient,
			deps: [EServiceToken.API_CLIENT_CONFIG_PROVIDER],
		},
		{
			token: EServiceToken.API_CLIENT_CONFIG_PROVIDER,
			useClass: ApiClientConfigProvider,
			deps: [EServiceToken.ENVIRONMENT, EServiceToken.SESSION_SERVICE],
		},

		{
			token: EServiceToken.TEMPORAL,
			useClass: Temporal,
			deps: [EServiceToken.INTL_SERVICE],
		},
	],
};
