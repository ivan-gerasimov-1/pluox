import type { IAppConfig } from '@core/infrastructure/appConfig/AppConfig';
import type { IAppConfigService } from '@core/infrastructure/appConfigService/AppConfigService';
import type { IAppConfigStorage } from '@core/infrastructure/appConfigStorage/types';
import type { IClientId } from '@core/infrastructure/clientId/types';
import type { IClientIdStorage } from '@core/infrastructure/clientIdStorage/types';
import type { ICurrencyConverter } from '@core/infrastructure/currency/currencyConverter/types';
import type { IIdGenerator } from '@core/infrastructure/idGenerator/types';
import type { IIntlService } from '@core/infrastructure/intl/intlService/types';
import type { NumberParser } from '@core/infrastructure/intl/numberParser/NumberParser';
import type { ICategories } from '@domain/categories/types';
import type { IExpenses } from '@domain/expenses/types';
import type { TEnvironment } from '@root/config';

export type ServiceType<T> = new (...args: any[]) => T;
export type ServiceToken = keyof IServiceMap;
export type FactoryFn<T> = (...args: any[]) => T;

export interface ServiceProvider<T = unknown> {
	token: ServiceToken;
	useClass?: ServiceType<T>;
	useFactory?: FactoryFn<T>;
	useValue?: T;
	deps?: ServiceToken[];
}

export enum EServiceToken {
	ENVIRONMENT = 'Environment',
	APP_CONFIG = 'AppConfig',
	INTL_SERVICE = 'IntlService',
	CURRENCY_CONVERTER = 'CurrencyConverter',
	NUMBER_PARSER = 'NumberParser',
	ID_GENERATOR = 'IdGenerator',
	CLIENT_ID_STORAGE = 'ClientIdStorage',
	CLIENT_ID = 'ClientId',
	CATEGORIES = 'Categories',
	EXPENSES = 'Expenses',
	APP_CONFIG_STORAGE = 'AppConfigStorage',
	APP_CONFIG_SERVICE = 'AppConfigService',
}

export interface IServiceMap {
	[EServiceToken.ENVIRONMENT]: TEnvironment;
	[EServiceToken.INTL_SERVICE]: IIntlService;
	[EServiceToken.CURRENCY_CONVERTER]: ICurrencyConverter;
	[EServiceToken.APP_CONFIG]: IAppConfig;
	[EServiceToken.NUMBER_PARSER]: NumberParser;
	[EServiceToken.ID_GENERATOR]: IIdGenerator;
	[EServiceToken.CLIENT_ID_STORAGE]: IClientIdStorage;
	[EServiceToken.CLIENT_ID]: IClientId;
	[EServiceToken.CATEGORIES]: ICategories;
	[EServiceToken.EXPENSES]: IExpenses;
	[EServiceToken.APP_CONFIG_STORAGE]: IAppConfigStorage;
	[EServiceToken.APP_CONFIG_SERVICE]: IAppConfigService;
}
