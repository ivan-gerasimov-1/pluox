import { ApiClient } from '@pluox/core/src/infrastructure/apiClient/apiClient';
import { ApiClientConfigProvider } from '@pluox/core/src/infrastructure/apiClient/configProvider';
import { DatabaseCollectionFactory } from '@pluox/core/src/infrastructure/database/databaseCollectionFactory';
import { databaseFactory } from '@pluox/core/src/infrastructure/database/databaseFactory';
import {
	IdGeneratorFactory,
	type IIdGeneratorFactory,
} from '@pluox/core/src/infrastructure/idGenerator/factory';
import { containerFactory } from '@pluox/core/src/infrastructure/serviceContainer/containerFactory';
import {
	EServiceToken,
	type IModule,
} from '@pluox/core/src/infrastructure/serviceContainer/types';
import { Temporal } from '@pluox/core/src/infrastructure/temporal/temporal';
import { bootstrapModule } from '@pluox/core/src/modules/bootstrap/bootstrap.module';
import { categoryModule } from '@pluox/core/src/modules/category/category.module';
import { currencyModule } from '@pluox/core/src/modules/currency/currency.module';
import { expenseModule } from '@pluox/core/src/modules/expense/expense.module';
import { identityModule } from '@pluox/core/src/modules/identity/identity.module';
import { intlModule } from '@pluox/core/src/modules/intl/intl.module';
import { productModule } from '@pluox/core/src/modules/product/product.module';
import { Environment } from '@pluox/core/src/modules/settings/infrastructure/environment/environment';
import { settingsModule } from '@pluox/core/src/modules/settings/settings.module';
import { syncModule } from '@pluox/core/src/modules/sync/sync.module';
import { userModule } from '@pluox/core/src/modules/user/user.module';
import { venueModule } from '@pluox/core/src/modules/venue/venue.module';

export function createDIContainer(options?: {
	isGlobal?: boolean;
	isDevelopment?: boolean;
}) {
	return containerFactory(options)
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
		.registerModule(productModule)
		.seal();
}

const sharedModule: IModule = {
	providers: [
		{
			token: EServiceToken.PROCESS_ENV,
			useValue: import.meta.env,
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

		/** Database */
		{
			token: EServiceToken.DATABASE,
			useFactory: databaseFactory,
			deps: [
				EServiceToken.LOCAL_STORAGE,
				EServiceToken.DATABASE_COLLECTION_FACTORY,
				EServiceToken.ENVIRONMENT,
			],
		},
		{
			token: EServiceToken.DATABASE_COLLECTION_FACTORY,
			useClass: DatabaseCollectionFactory,
		},
	],
};
