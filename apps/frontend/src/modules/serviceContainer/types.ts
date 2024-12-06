import type { IAppConfig } from '@core/infrastructure/appConfig/AppConfig';
import type { IAppConfigService } from '@core/infrastructure/appConfigService/AppConfigService';
import type { IAppConfigStorage } from '@core/infrastructure/appConfigStorage/types';
import type { IAuthApi } from '@core/infrastructure/authApi/types';
import type { IAuthSerivce } from '@core/infrastructure/authService/types';
import type { IAuthStorage } from '@core/infrastructure/authStorage/types';
import type { IBaseApi } from '@core/infrastructure/baseApi/types';
import type { IClientId } from '@core/infrastructure/clientId/types';
import type { IClientIdStorage } from '@core/infrastructure/clientIdStorage/types';
import type { ICurrencyConverter } from '@core/infrastructure/currency/currencyConverter/types';
import type { ICurrencyRatesAPI } from '@core/infrastructure/currency/currencyRatesAPI/types';
import type { IExpensesApi } from '@core/infrastructure/expensesApi/types';
import type { IExpensesStorage } from '@core/infrastructure/expensesStorage/types';
import type { IIdGenerator } from '@core/infrastructure/idGenerator/types';
import type { IIntlService } from '@core/infrastructure/intl/intlService/types';
import type { NumberParser } from '@core/infrastructure/intl/numberParser/NumberParser';
import type { IUserStorage } from '@core/infrastructure/userStorage/types';
import type { ICategories } from '@domain/categories/types';
import type { IExpenses } from '@domain/expenses/types';
import type { IAppConfigStore } from '@modules/appConfig/appConfig.store';
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
	APP_CONFIG_STORE = 'AppConfigStore',
	CURRENCY_RATES_API = 'CurrencyRatesAPI',
	AUTH_STORAGE = 'AuthStorage',
	BASE_API = 'BaseApi',
	AUTH_API = 'AuthApi',
	EXPENSES_API = 'ExpensesApi',
	USER_STORAGE = 'UserStorage',
	AUTH_SERVICE = 'AuthService',
	EXPENSES_STORAGE = 'ExpensesStorage',
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
	[EServiceToken.APP_CONFIG_STORE]: IAppConfigStore;
	[EServiceToken.CURRENCY_RATES_API]: ICurrencyRatesAPI;
	[EServiceToken.AUTH_STORAGE]: IAuthStorage;
	[EServiceToken.BASE_API]: IBaseApi;
	[EServiceToken.AUTH_API]: IAuthApi;
	[EServiceToken.EXPENSES_API]: IExpensesApi;
	[EServiceToken.USER_STORAGE]: IUserStorage;
	[EServiceToken.AUTH_SERVICE]: IAuthSerivce;
	[EServiceToken.EXPENSES_STORAGE]: IExpensesStorage;
}
