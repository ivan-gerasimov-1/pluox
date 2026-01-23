import {
	EServiceToken,
	type IModule,
} from '@pluox/core/src/infrastructure/serviceContainer/types';

import { CurrencyConverter } from '@pluox/core/src/modules/currency/application/currencyConverter/currencyConverter';
import { CurrencyRateService } from '@pluox/core/src/modules/currency/application/currencyRateService/currencyRateService';
import { CurrencyRateAPI } from '@pluox/core/src/modules/currency/infrastructure/currencyRateAPI/currencyRateAPI';
import { currencyRateDataSourceFactory } from '@pluox/core/src/modules/currency/infrastructure/currencyRateDataSource/currencyRateDataSourceFactory';
import { CurrencyRateRepository } from '@pluox/core/src/modules/currency/infrastructure/currencyRateRepository/currencyRateRepository';

export const currencyModule: IModule = {
	providers: [
		{
			token: EServiceToken.CURRENCY_RATE_DATASOURCE,
			useFactory: currencyRateDataSourceFactory,
			deps: [EServiceToken.DATABASE],
		},
		{
			token: EServiceToken.CURRENCY_RATE_SERVICE,
			useClass: CurrencyRateService,
			deps: [
				EServiceToken.CURRENCY_RATE_REPOSITORY,
				EServiceToken.CURRENCY_CONVERTER,
			],
		},
		{
			token: EServiceToken.CURRENCY_RATE_REPOSITORY,
			useClass: CurrencyRateRepository,
			deps: [EServiceToken.CURRENCY_RATE_DATASOURCE],
		},
		{
			token: EServiceToken.CURRENCY_CONVERTER,
			useClass: CurrencyConverter,
			deps: [EServiceToken.CURRENCY_RATE_REPOSITORY],
		},
		{
			token: EServiceToken.CURRENCY_RATE_API,
			useClass: CurrencyRateAPI,
			deps: [EServiceToken.ENVIRONMENT, EServiceToken.APP_CONFIG],
		},
	],
};
