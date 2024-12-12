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
import type { ICurrencyRates } from '@core/infrastructure/currency/currencyRates/CurrencyRates';
import type { ICurrencyRatesAPI } from '@core/infrastructure/currency/currencyRatesAPI/types';
import type { ICurrencyRatesStorage } from '@core/infrastructure/currency/currencyRatesStorage/types';
import type { IExpensesApi } from '@core/infrastructure/expensesApi/types';
import type { IIdGenerator } from '@core/infrastructure/idGenerator/types';
import type { IIntlService } from '@core/infrastructure/intl/intlService/types';
import type { NumberParser } from '@core/infrastructure/intl/numberParser/NumberParser';
import type { IUserStorage } from '@core/infrastructure/userStorage/types';
import type { IAmount } from '@domain/amount/types';
import type { ITotalAmountUseCase } from '@domain/amount/useCases/totalAmountUseCase';
import type { ICategories } from '@domain/categories/types';
import type { IAppConfigStore } from '@root/presentation/web-ui/modules/appConfig/appConfig.store';
import type { TEnvironment } from '@root/config';
import type { ITemporal } from '@root/core/infrastructure/temporal/types';
import type { IUpdateExpenseUseCase } from '@root/core/modules/expense/domain/expenseUseCases/updateExpenseUseCase';
import type { ICreateExpenseUseCase } from '@root/core/modules/expense/domain/expenseUseCases/createExpenseUseCase';
import type { IDeleteExpenseUseCase } from '@root/core/modules/expense/domain/expenseUseCases/deleteExpenseUseCase';
import type { IExpenseRepository } from '@root/core/modules/expense/domain/expenseRepository/types';
import type { IExpenseDataSource } from '@root/core/modules/expense/infrastructure/expenseDataSource/types';

export interface IContainer {
	register(...providers: ServiceProvider[]): IContainer;
	validate(): void;
	get<T extends ServiceToken = ServiceToken>(token: T): IServiceMap[T];
	clear(token: ServiceToken): void;
	clearAll(): void;
}

export type ServiceType<T> = new (...args: any[]) => T;
export type ServiceToken = keyof IServiceMap;
export type FactoryFn<T> = (...args: any[]) => T;

export const enum ServiceScope {
	SINGLETON = 'singleton',
	TRANSIENT = 'transient',
}

export interface ServiceProvider<T = unknown> {
	token: ServiceToken;
	useClass?: ServiceType<T>;
	useFactory?: FactoryFn<T>;
	useValue?: T;
	deps?: ServiceToken[];
	scope?: ServiceScope;
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
	EXPENSE_REPOSITORY = 'ExpenseRepository',
	EXPENSE_DATASOURCE = 'ExpenseDataSource',
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
	CURRENCY_RATES_STORAGE = 'CurrencyRatesStorage',
	CURRENCY_RATES = 'CurrencyRates',
	TOTAL_AMOUNT_USE_CASE = 'TotalAmountUseCase',
	AMOUNT = 'Amount',
	TEMPORAL = 'Temporal',
	EXPENSE_CREATE_USE_CASE = 'ExpenseCreateUseCase',
	EXPENSE_UPDATE_USE_CASE = 'ExpenseUpdateUseCase',
	EXPENSE_DELETE_USE_CASE = 'ExpenseDeleteUseCase',
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
	[EServiceToken.EXPENSE_REPOSITORY]: IExpenseRepository;
	[EServiceToken.EXPENSE_DATASOURCE]: IExpenseDataSource;
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
	[EServiceToken.CURRENCY_RATES_STORAGE]: ICurrencyRatesStorage;
	[EServiceToken.CURRENCY_RATES]: ICurrencyRates;
	[EServiceToken.TOTAL_AMOUNT_USE_CASE]: ITotalAmountUseCase;
	[EServiceToken.AMOUNT]: IAmount;
	[EServiceToken.TEMPORAL]: ITemporal;
	[EServiceToken.EXPENSE_CREATE_USE_CASE]: ICreateExpenseUseCase;
	[EServiceToken.EXPENSE_UPDATE_USE_CASE]: IUpdateExpenseUseCase;
	[EServiceToken.EXPENSE_DELETE_USE_CASE]: IDeleteExpenseUseCase;
}
