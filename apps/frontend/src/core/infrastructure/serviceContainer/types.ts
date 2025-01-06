import type { IAppConfig } from '@root/core/modules/settings/domain/appConfig/types';
import type { IAppConfigService } from '@root/core/modules/settings/application/appConfigService/types';
import type { IAppConfigDataSource } from '@root/core/modules/settings/infrastructure/appConfigDataSource/types';
import type { IAuthApi } from '@root/core/modules/identity/infrastructure/authApi/types';
import type { IAuthSerivce } from '@root/core/modules/identity/application/authService/types';
import type { IBaseApi } from '@core/infrastructure/baseApi/types';
import type {
	IClientId,
	IClientIdFactory,
} from '@root/core/modules/identity/domain/clientId/types';
import type { ICurrencyConverter } from '@root/core/modules/currency/application/currencyConverter/types';
import type { ICurrencyRateService } from '@root/core/modules/currency/application/currencyRateService/types';
import type { ICurrencyRateAPI } from '@root/core/modules/currency/infrastructure/currencyRateAPI/types';
import type { ICurrencyRateDataSource } from '@root/core/modules/currency/infrastructure/currencyRateDataSource/types';
import type { IExpenseApi } from '@root/core/modules/expense/infrastructure/expenseApi/types';
import type { IIdGenerator } from '@root/core/domain/idGenerator/types';
import type { IIntlService } from '@root/core/modules/intl/application/intlService/types';
import type { IUserDataSource } from '@root/core/modules/identity/infrastructure/userDataSource/types';
import type { ITotalAmountUseCase } from '@root/core/modules/expense/domain/expenseUseCases/totalAmountUseCase/totalAmountUseCase';
import type { ICategoryService } from '@root/core/modules/category/application/categoryService/types';
import type {
	IEnvironment,
	TProcessEnv,
} from '@root/core/modules/settings/infrastructure/environment/types';
import type { ITemporal } from '@root/core/domain/temporal/types';
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
import type { IDailyAmountUseCase } from '@root/core/modules/expense/domain/expenseUseCases/dailyAmountUseCase';
import type { INumberParser } from '@root/core/modules/intl/domain/numberParser/types';
import type { ICurrencyFormatter } from '@root/core/modules/intl/domain/currencyFormatter/types';
import type { IDateFormatter } from '@root/core/modules/intl/domain/dateFormatter/types';
import type { ILauchControl } from '@root/core/modules/bootstrap/application/launchControl/types';
import type { IUserService } from '@root/core/modules/identity/application/userService/types';
import type { IExpenseMapper } from '@root/core/modules/expense/infrastructure/expenseMapper/types';
import type { ICategoryMapper } from '@root/core/modules/category/infrastructure/categoryMapper/types';
import type { IUserMapper } from '@root/core/modules/identity/infrastructure/userMapper/types';
import type { IUserRepository } from '@root/core/modules/identity/domain/userRepository/types';
import type { ISessionService } from '@root/core/modules/identity/application/sessionService/types';
import type { ISessionDataSource } from '@root/core/modules/identity/infrastructure/sessionDataSource/types';

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
	PROCESS_ENV = 'ProcessEnv',
	ENVIRONMENT = 'Environment',

	APP_CONFIG = 'AppConfig',
	APP_CONFIG_DATASOURCE = 'AppConfigDataSource',
	APP_CONFIG_SERVICE = 'AppConfigService',

	INTL_SERVICE = 'IntlService',
	NUMBER_PARSER = 'NumberParser',
	CURRENCY_FORMATTER = 'CurrencyFormatter',
	DATE_FORMATTER = 'DateFormatter',

	CURRENCY_CONVERTER = 'CurrencyConverter',
	CURRENCY_RATE_DATASOURCE = 'CurrencyRateDataSource',
	CURRENCY_RATE_SERVICE = 'CurrencyRateService',
	CURRENCY_RATE_API = 'CurrencyRateAPI',
	CURRENCY_RATE_REPOSITORY = 'CurrencyRateRepository',

	ID_GENERATOR_FACTORY = 'IdGeneratorFactory',
	ID_GENERATOR = 'IdGenerator',

	SESSION_DATASOURCE = 'SessionDataSource',
	SESSION_SERVICE = 'SessionService',

	CLIENT_ID = 'ClientId',
	CLIENT_ID_FACTORY = 'ClientIdFactory',

	CATEGORY_SERVICE_FACTORY = 'CategoryServiceFactory',
	CATEGORY_SERVICE = 'CategoryService',
	CATEGORY_REPOSITORY = 'CategoryRepository',
	CATEGORY_DATASOURCE = 'CategoryDataSource',
	CATEGORY_MAPPER = 'CategoryMapper',

	EXPENSE_REPOSITORY = 'ExpenseRepository',
	EXPENSE_DATASOURCE = 'ExpenseDataSource',
	EXPENSE_SERVICE = 'ExpenseService',
	EXPENSE_MAPPER = 'ExpenseMapper',

	LAUNCH_CONTROL = 'LaunchControl',

	/** @deprecated */
	AUTH_DATASOURCE = 'AuthDataSource',
	AUTH_SERVICE = 'AuthService',

	BASE_API = 'BaseApi',
	AUTH_API = 'AuthApi',
	EXPENSE_API = 'ExpensesApi',

	USER_SERVICE = 'UserService',
	USER_DATASOURCE = 'UserDataSource',
	USER_MAPPER = 'UserMapper',
	USER_REPOSITORY = 'UserRepository',

	TEMPORAL = 'Temporal',

	TOTAL_AMOUNT_USE_CASE = 'TotalAmountUseCase',
	EXPENSE_CREATE_USE_CASE = 'ExpenseCreateUseCase',
	EXPENSE_UPDATE_USE_CASE = 'ExpenseUpdateUseCase',
	EXPENSE_DELETE_USE_CASE = 'ExpenseDeleteUseCase',
	MONTHLY_EXPENSES_BY_CATEGORY_USE_CASE = 'MonthlyExpensesByCategoryUseCase',
	GROUP_EXPENSE_BY_DATE_USE_CASE = 'GroupExpensesByDateUseCase',
	DAILY_AMOUNT_USE_CASE = 'DailyAmountUseCase',
}

export interface IServiceMap {
	[EServiceToken.PROCESS_ENV]: TProcessEnv;
	[EServiceToken.ENVIRONMENT]: IEnvironment;

	[EServiceToken.INTL_SERVICE]: IIntlService;
	[EServiceToken.CURRENCY_CONVERTER]: ICurrencyConverter;
	[EServiceToken.APP_CONFIG]: IAppConfig;

	[EServiceToken.NUMBER_PARSER]: INumberParser;
	[EServiceToken.CURRENCY_FORMATTER]: ICurrencyFormatter;
	[EServiceToken.DATE_FORMATTER]: IDateFormatter;

	[EServiceToken.ID_GENERATOR_FACTORY]: IIdGeneratorFactory;
	[EServiceToken.ID_GENERATOR]: IIdGenerator;

	[EServiceToken.SESSION_DATASOURCE]: ISessionDataSource;
	[EServiceToken.SESSION_SERVICE]: ISessionService;

	[EServiceToken.CLIENT_ID]: IClientId;
	[EServiceToken.CLIENT_ID_FACTORY]: IClientIdFactory;

	[EServiceToken.CATEGORY_SERVICE_FACTORY]: () => ICategoryServiceFactory;
	[EServiceToken.CATEGORY_SERVICE]: ICategoryService;
	[EServiceToken.CATEGORY_REPOSITORY]: ICategoryRepository;
	[EServiceToken.CATEGORY_DATASOURCE]: ICategoryDataSource;
	[EServiceToken.CATEGORY_MAPPER]: ICategoryMapper;

	[EServiceToken.EXPENSE_REPOSITORY]: IExpenseRepository;
	[EServiceToken.EXPENSE_DATASOURCE]: IExpenseDataSource;
	[EServiceToken.EXPENSE_SERVICE]: IExpenseService;
	[EServiceToken.EXPENSE_MAPPER]: IExpenseMapper;

	[EServiceToken.APP_CONFIG_DATASOURCE]: IAppConfigDataSource;
	[EServiceToken.APP_CONFIG_SERVICE]: IAppConfigService;

	[EServiceToken.CURRENCY_RATE_API]: ICurrencyRateAPI;
	[EServiceToken.CURRENCY_RATE_REPOSITORY]: ICurrencyRateRepository;

	[EServiceToken.LAUNCH_CONTROL]: ILauchControl;

	[EServiceToken.BASE_API]: IBaseApi;
	[EServiceToken.AUTH_API]: IAuthApi;
	[EServiceToken.EXPENSE_API]: IExpenseApi;
	[EServiceToken.AUTH_SERVICE]: IAuthSerivce;

	[EServiceToken.USER_SERVICE]: IUserService;
	[EServiceToken.USER_DATASOURCE]: IUserDataSource;
	[EServiceToken.USER_MAPPER]: IUserMapper;
	[EServiceToken.USER_REPOSITORY]: IUserRepository;

	[EServiceToken.CURRENCY_RATE_DATASOURCE]: ICurrencyRateDataSource;
	[EServiceToken.CURRENCY_RATE_SERVICE]: ICurrencyRateService;

	[EServiceToken.TOTAL_AMOUNT_USE_CASE]: ITotalAmountUseCase;
	[EServiceToken.TEMPORAL]: ITemporal;
	[EServiceToken.EXPENSE_CREATE_USE_CASE]: ICreateExpenseUseCase;
	[EServiceToken.EXPENSE_UPDATE_USE_CASE]: IUpdateExpenseUseCase;
	[EServiceToken.EXPENSE_DELETE_USE_CASE]: IDeleteExpenseUseCase;
	[EServiceToken.MONTHLY_EXPENSES_BY_CATEGORY_USE_CASE]: IMonthlyExpensesByCategoryUseCase;
	[EServiceToken.GROUP_EXPENSE_BY_DATE_USE_CASE]: IGroupExpenseByDateUseCase;
	[EServiceToken.DAILY_AMOUNT_USE_CASE]: IDailyAmountUseCase;
}
