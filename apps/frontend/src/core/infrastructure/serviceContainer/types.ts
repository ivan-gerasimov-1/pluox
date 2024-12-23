import type { IAppConfig } from '@core/infrastructure/appConfig/AppConfig';
import type { IAppConfigService } from '@core/infrastructure/appConfigService/AppConfigService';
import type { IAppConfigStorage } from '@core/infrastructure/appConfigStorage/types';
import type { IAuthApi } from '@core/infrastructure/authApi/types';
import type { IAuthSerivce } from '@core/infrastructure/authService/types';
import type { IAuthDataSource } from '@root/core/infrastructure/authDataSource/types';
import type { IBaseApi } from '@core/infrastructure/baseApi/types';
import type { IClientId } from '@core/infrastructure/clientId/types';
import type { IClientIdDataSource } from '@root/core/infrastructure/clientIdDataSource/types';
import type { ICurrencyConverter } from '@root/core/modules/currency/application/currencyConverter/types';
import type { ICurrencyRateService } from '@root/core/modules/currency/application/currencyRateService/types';
import type { ICurrencyRateAPI } from '@root/core/modules/currency/infrastructure/currencyRateAPI/types';
import type { ICurrencyRateDataSource } from '@root/core/modules/currency/infrastructure/currencyRateDataSource/types';
import type { IExpenseApi } from '@root/core/modules/expense/infrastructure/expenseApi/types';
import type { IIdGenerator } from '@core/infrastructure/idGenerator/types';
import type { IIntlService } from '@core/infrastructure/intl/intlService/types';
import type { NumberParser } from '@core/infrastructure/intl/numberParser/NumberParser';
import type { IUserStorage } from '@core/infrastructure/userStorage/types';
import type { ITotalAmountUseCase } from '@root/core/modules/expense/domain/expenseUseCases/totalAmountUseCase/totalAmountUseCase';
import type { ICategoryService } from '@root/core/modules/category/application/categoryService/types';
import type { IAppConfigStore } from '@root/presentation/web-ui/modules/appConfig/appConfig.store';
import type { TEnvironment } from '@root/config';
import type { ITemporal } from '@root/core/infrastructure/temporal/types';
import type { IUpdateExpenseUseCase } from '@root/core/modules/expense/domain/expenseUseCases/updateExpenseUseCase';
import type { ICreateExpenseUseCase } from '@root/core/modules/expense/domain/expenseUseCases/createExpenseUseCase';
import type { IDeleteExpenseUseCase } from '@root/core/modules/expense/domain/expenseUseCases/deleteExpenseUseCase';
import type { IExpenseRepository } from '@root/core/modules/expense/domain/expenseRepository/types';
import type { IExpenseDataSource } from '@root/core/modules/expense/infrastructure/expenseDataSource/types';
import type { IMonthlyExpensesByCategoryUseCase } from '@root/core/modules/expense/domain/expenseUseCases/monthlyExpensesByCategoryUseCase';
import type { IExpenseService } from '@root/core/modules/expense/application/expenseService/types';
import type { ICategoryServiceFactory } from '@root/core/modules/category/application/categoryService/factory';
import type { IIdGeneratorFactory } from '@root/core/infrastructure/idGenerator/factory';
import type { IGroupExpenseByDateUseCase } from '@root/core/modules/expense/domain/expenseUseCases/groupExpensesByDayUseCase';
import type { ICategoryRepository } from '@root/core/modules/category/domain/categoryRepository/types';
import type { ICategoryDataSource } from '@root/core/modules/category/infrastructure/categoryDataSource/types';
import type { ICurrencyRateRepository } from '@root/core/modules/currency/domain/currencyRateRepository/currencyRateRepository';

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
	APP_CONFIG_STORAGE = 'AppConfigStorage',
	APP_CONFIG_SERVICE = 'AppConfigService',
	APP_CONFIG_STORE = 'AppConfigStore',

	INTL_SERVICE = 'IntlService',
	NUMBER_PARSER = 'NumberParser',

	CURRENCY_CONVERTER = 'CurrencyConverter',
	CURRENCY_RATE_DATASOURCE = 'CurrencyRateDataSource',
	CURRENCY_RATE_SERVICE = 'CurrencyRateService',
	CURRENCY_RATE_API = 'CurrencyRateAPI',
	CURRENCY_RATE_REPOSITORY = 'CurrencyRateRepository',

	ID_GENERATOR_FACTORY = 'IdGeneratorFactory',
	ID_GENERATOR = 'IdGenerator',

	CLIENT_ID_DATASOURCE = 'ClientIdDataSource',
	CLIENT_ID = 'ClientId',

	CATEGORY_SERVICE_FACTORY = 'CategoryServiceFactory',
	CATEGORY_SERVICE = 'CategoryService',
	CATEGORY_REPOSITORY = 'CategoryRepository',
	CATEGORY_DATASOURCE = 'CategoryDataSource',

	EXPENSE_REPOSITORY = 'ExpenseRepository',
	EXPENSE_DATASOURCE = 'ExpenseDataSource',
	EXPENSE_SERVICE = 'ExpenseService',

	AUTH_DATASOURCE = 'AuthDataSource',
	AUTH_SERVICE = 'AuthService',

	BASE_API = 'BaseApi',
	AUTH_API = 'AuthApi',
	EXPENSE_API = 'ExpensesApi',

	USER_STORAGE = 'UserStorage',

	TEMPORAL = 'Temporal',

	TOTAL_AMOUNT_USE_CASE = 'TotalAmountUseCase',
	EXPENSE_CREATE_USE_CASE = 'ExpenseCreateUseCase',
	EXPENSE_UPDATE_USE_CASE = 'ExpenseUpdateUseCase',
	EXPENSE_DELETE_USE_CASE = 'ExpenseDeleteUseCase',
	MONTHLY_EXPENSES_BY_CATEGORY_USE_CASE = 'MonthlyExpensesByCategoryUseCase',
	GROUP_EXPENSE_BY_DATE_USE_CASE = 'GroupExpensesByDateUseCase',
}

export interface IServiceMap {
	[EServiceToken.ENVIRONMENT]: TEnvironment;
	[EServiceToken.INTL_SERVICE]: IIntlService;
	[EServiceToken.CURRENCY_CONVERTER]: ICurrencyConverter;
	[EServiceToken.APP_CONFIG]: IAppConfig;
	[EServiceToken.NUMBER_PARSER]: NumberParser;
	[EServiceToken.ID_GENERATOR_FACTORY]: IIdGeneratorFactory;
	[EServiceToken.ID_GENERATOR]: IIdGenerator;
	[EServiceToken.CLIENT_ID_DATASOURCE]: IClientIdDataSource;
	[EServiceToken.CLIENT_ID]: IClientId;
	[EServiceToken.CATEGORY_SERVICE_FACTORY]: () => ICategoryServiceFactory;
	[EServiceToken.CATEGORY_SERVICE]: ICategoryService;
	[EServiceToken.CATEGORY_REPOSITORY]: ICategoryRepository;
	[EServiceToken.CATEGORY_DATASOURCE]: ICategoryDataSource;
	[EServiceToken.EXPENSE_REPOSITORY]: IExpenseRepository;
	[EServiceToken.EXPENSE_DATASOURCE]: IExpenseDataSource;
	[EServiceToken.EXPENSE_SERVICE]: IExpenseService;
	[EServiceToken.APP_CONFIG_STORAGE]: IAppConfigStorage;
	[EServiceToken.APP_CONFIG_SERVICE]: IAppConfigService;
	[EServiceToken.APP_CONFIG_STORE]: IAppConfigStore;

	[EServiceToken.CURRENCY_RATE_API]: ICurrencyRateAPI;
	[EServiceToken.CURRENCY_RATE_REPOSITORY]: ICurrencyRateRepository;

	[EServiceToken.AUTH_DATASOURCE]: IAuthDataSource;
	[EServiceToken.BASE_API]: IBaseApi;
	[EServiceToken.AUTH_API]: IAuthApi;
	[EServiceToken.EXPENSE_API]: IExpenseApi;
	[EServiceToken.USER_STORAGE]: IUserStorage;
	[EServiceToken.AUTH_SERVICE]: IAuthSerivce;

	[EServiceToken.CURRENCY_RATE_DATASOURCE]: ICurrencyRateDataSource;
	[EServiceToken.CURRENCY_RATE_SERVICE]: ICurrencyRateService;

	[EServiceToken.TOTAL_AMOUNT_USE_CASE]: ITotalAmountUseCase;
	[EServiceToken.TEMPORAL]: ITemporal;
	[EServiceToken.EXPENSE_CREATE_USE_CASE]: ICreateExpenseUseCase;
	[EServiceToken.EXPENSE_UPDATE_USE_CASE]: IUpdateExpenseUseCase;
	[EServiceToken.EXPENSE_DELETE_USE_CASE]: IDeleteExpenseUseCase;
	[EServiceToken.MONTHLY_EXPENSES_BY_CATEGORY_USE_CASE]: IMonthlyExpensesByCategoryUseCase;
	[EServiceToken.GROUP_EXPENSE_BY_DATE_USE_CASE]: IGroupExpenseByDateUseCase;
}
