import { ApiClient } from '@/core/infrastructure/apiClient/apiClient';
import { ApiClientConfigProvider } from '@/core/infrastructure/apiClient/configProvider';
import { DatabaseCollectionFactory } from '@/core/infrastructure/database/databaseCollectionFactory';
import { databaseFactory } from '@/core/infrastructure/database/databaseFactory';
import {
	IdGeneratorFactory,
	type IIdGeneratorFactory,
} from '@/core/infrastructure/idGenerator/factory';
import { containerFactory } from '@/core/infrastructure/serviceContainer/containerFactory';
import {
	EServiceToken,
	type IModule,
} from '@/core/infrastructure/serviceContainer/types';
import { Temporal } from '@/core/infrastructure/temporal/temporal';
import { bootstrapModule } from '@/core/modules/bootstrap/bootstrap.module';
import { categoryModule } from '@/core/modules/category/category.module';
import { currencyModule } from '@/core/modules/currency/currency.module';
import { expenseModule } from '@/core/modules/expense/expense.module';
import { identityModule } from '@/core/modules/identity/identity.module';
import { intlModule } from '@/core/modules/intl/intl.module';
import { productModule } from '@/core/modules/product/product.module';
import { Environment } from '@/core/modules/settings/infrastructure/environment/environment';
import { settingsModule } from '@/core/modules/settings/settings.module';
import { syncModule } from '@/core/modules/sync/sync.module';
import { userModule } from '@/core/modules/user/user.module';
import { venueModule } from '@/core/modules/venue/venue.module';

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
