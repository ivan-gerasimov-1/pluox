import type { TValueOf } from '@root/core/types';

import type { IAppConfig } from '@root/core/modules/settings/domain/appConfig/types';
import type { IAppConfigService } from '@root/core/modules/settings/application/appConfigService/types';
import type { IAppConfigDataSource } from '@root/core/modules/settings/infrastructure/appConfigDataSource/types';
import type { IAuthApi } from '@root/core/modules/identity/infrastructure/authApi/types';
import type { IAuthSerivce } from '@root/core/modules/identity/application/authService/types';
import type {
	IApiClient,
	IApiClientConfigProvider,
} from '@root/core/infrastructure/apiClient/types';
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
import type { IUserDataSource } from '@root/core/modules/user/infrastructure/userDataSource/types';
import type { ICategoryService } from '@root/core/modules/category/application/categoryService/types';
import type {
	IEnvironment,
	TMetaEnv,
} from '@root/core/modules/settings/infrastructure/environment/types';
import type { ITemporal } from '@root/core/domain/temporal/types';
import type { IExpenseRepository } from '@root/core/modules/expense/domain/expenseRepository/types';
import type { IExpenseDataSource } from '@root/core/modules/expense/infrastructure/expenseDataSource/types';
import type { IExpenseService } from '@root/core/modules/expense/application/expenseService/types';
import type { IIdGeneratorFactory } from '@root/core/infrastructure/idGenerator/factory';
import type { ICategoryRepository } from '@root/core/modules/category/domain/categoryRepository/types';
import type { ICategoryDataSource } from '@root/core/modules/category/infrastructure/categoryDataSource/types';
import type { ICurrencyRateRepository } from '@root/core/modules/currency/domain/currencyRateRepository/currencyRateRepository';
import type { INumberParser } from '@root/core/modules/intl/domain/numberParser/types';
import type { ICurrencyFormatter } from '@root/core/modules/intl/domain/currencyFormatter/types';
import type { IDateFormatter } from '@root/core/modules/intl/domain/dateFormatter/types';
import type { ILauchControl } from '@root/core/modules/bootstrap/application/launchControl/types';
import type { IUserService } from '@root/core/modules/user/application/userService/types';
import type { IExpenseMapper } from '@root/core/modules/expense/infrastructure/expenseMapper/types';
import type { ICategoryMapper } from '@root/core/modules/category/infrastructure/categoryMapper/types';
import type { IUserMapper } from '@root/core/modules/user/infrastructure/userMapper/types';
import type { IUserRepository } from '@root/core/modules/user/domain/userRepository/types';
import type { ISessionService } from '@root/core/modules/identity/application/sessionService/types';
import type { ISessionDataSource } from '@root/core/modules/identity/infrastructure/sessionDataSource/types';
import type { ISessionFactory } from '@root/core/modules/identity/domain/session/types';
import type { ISyncService } from '@root/core/modules/sync/application/syncService/types';
import type { IAuthTokenFactory } from '@root/core/modules/identity/domain/authToken/types';
import type { IExpenseGroupingService } from '@root/core/modules/expense/application/expenseGroupingService/types';
import type { IExpenseAmountService } from '@root/core/modules/expense/application/expenseAmountService/types';
import type { IExpenseQueryService } from '@root/core/modules/expense/application/expenseQueryService/types';
import type {
	ICreateExpenseUseCase,
	IDeleteExpenseUseCase,
	IExpenseUseCase,
	IUpdateExpenseUseCase,
} from '@root/core/modules/expense/application/expenseUseCases/types';
import type {
	ICategoryCreateUseCase,
	ICategoryDeleteUseCase,
	ICategoryInitializeUseCase,
	ICategoryUpdateUseCase,
	ICategoryUseCase,
	ICategoryWeightUseCase,
} from '@root/core/modules/category/application/categoryUseCase/types';
import type { ICategoryQueryService } from '@root/core/modules/category/application/categoryQueryService/types';
import type { IVenueQueryService } from '@root/core/modules/venue/application/venueQueryService/types';
import type {
	IVenueArchiveUseCase,
	IVenueCreateUseCase,
	IVenueDeleteUseCase,
	IVenueUnarchiveUseCase,
	IVenueUseCase,
} from '@root/core/modules/venue/application/venueUseCase/types';
import type { IVenueRepository } from '@root/core/modules/venue/domain/venueRepository/types';
import type { IVenueDataSource } from '@root/core/modules/venue/infrastructure/venueDataSource/types';
import type { IVenueMapper } from '@root/core/modules/venue/infrastructure/venueMapper/types';
import type {
	IDatabaseCollectionFactory,
	IDatabase,
	IStorage,
} from '@root/core/infrastructure/database/types';

export interface IContainer {
	readonly providers: Map<TServiceToken, IServiceProvider>;

	register(...providers: IServiceProvider[]): IContainer;
	registerModule(module: IModule): IContainer;
	seal(): IContainer;
	createInstance<T>(provider: IServiceProvider<T>): T;
	get<T extends TServiceToken = TServiceToken>(token: T): IServiceMap[T];
	disposeInstance(token: TServiceToken): void;
	disposeAll(): void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TServiceType<T> = new (...args: any[]) => T;
export type TServiceToken = keyof IServiceMap;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TFactoryFn<T> = (...args: any[]) => T;

export const EServiceScope = {
	SINGLETON: 'singleton',
	TRANSIENT: 'transient',
} as const;

export type TServiceScope = TValueOf<typeof EServiceScope>;

export interface IServiceProvider<T = unknown> {
	token: TServiceToken;
	useClass?: TServiceType<T>;
	useFactory?: TFactoryFn<T>;
	useValue?: T;
	deps?: TServiceToken[];
	scope?: TServiceScope;
}

export interface IModule {
	imports?: Array<IModule>;
	providers: Array<IServiceProvider>;
	exports?: Array<IServiceProvider>;
}

export const EServiceToken = {
	GLOBAL: 'Global',
	LOCAL_STORAGE: 'LocalStorage',

	PROCESS_ENV: 'ProcessEnv',
	ENVIRONMENT: 'Environment',

	DATABASE: 'Database',
	DATABASE_COLLECTION_FACTORY: 'CustomCollectionFactory',

	APP_CONFIG: 'AppConfig',
	APP_CONFIG_DATASOURCE: 'AppConfigDataSource',
	APP_CONFIG_SERVICE: 'AppConfigService',

	INTL_SERVICE: 'IntlService',
	NUMBER_PARSER: 'NumberParser',
	CURRENCY_FORMATTER: 'CurrencyFormatter',
	DATE_FORMATTER: 'DateFormatter',

	CURRENCY_CONVERTER: 'CurrencyConverter',
	CURRENCY_RATE_DATASOURCE: 'CurrencyRateDataSource',
	CURRENCY_RATE_SERVICE: 'CurrencyRateService',
	CURRENCY_RATE_API: 'CurrencyRateAPI',
	CURRENCY_RATE_REPOSITORY: 'CurrencyRateRepository',

	ID_GENERATOR_FACTORY: 'IdGeneratorFactory',
	ID_GENERATOR: 'IdGenerator',

	SESSION_DATASOURCE: 'SessionDataSource',
	SESSION_SERVICE: 'SessionService',
	SESSION_FACTORY: 'SessionFactory',

	CLIENT_ID: 'ClientId',
	CLIENT_ID_FACTORY: 'ClientIdFactory',

	CATEGORY_SERVICE: 'CategoryService',
	CATEGORY_REPOSITORY: 'CategoryRepository',
	CATEGORY_DATASOURCE: 'CategoryDataSource',
	CATEGORY_MAPPER: 'CategoryMapper',
	CATEGORY_USE_CASE: 'CategoryUseCase',
	CATEGORY_CREATE_USE_CASE: 'CategoryCreateUseCase',
	CATEGORY_UPDATE_USE_CASE: 'CategoryUpdateUseCase',
	CATEGORY_DELETE_USE_CASE: 'CategoryDeleteUseCase',
	CATEGORY_WEIGHT_USE_CASE: 'CategoryWeightUseCase',
	CATEGORY_INITIALIZE_USE_CASE: 'CategoryInitializeUseCase',
	CATEGORY_QUERY_SERVICE: 'CategoryQueryService',

	EXPENSE_REPOSITORY: 'ExpenseRepository',
	EXPENSE_DATASOURCE: 'ExpenseDataSource',
	EXPENSE_SERVICE: 'ExpenseService',
	EXPENSE_MAPPER: 'ExpenseMapper',
	EXPENSE_GROUPING_SERVICE: 'ExpenseGroupingService',
	EXPENSE_AMOUNT_SERVICE: 'ExpenseAmountService',
	EXPENSE_QUERY_SERVICE: 'ExpenseQueryService',
	EXPENSE_USE_CASE: 'ExpenseUseCase',

	VENUE_REPOSITORY: 'VenueRepository',
	VENUE_DATASOURCE: 'VenueDataSource',
	VENUE_MAPPER: 'VenueMapper',
	VENUE_QUERY_SERVICE: 'VenueQueryService',
	VENUE_USE_CASE: 'VenueUseCase',
	VENUE_CREATE_USE_CASE: 'VenueCreateUseCase',
	VENUE_DELETE_USE_CASE: 'VenueDeleteUseCase',
	VENUE_ARCHIVE_USE_CASE: 'VenueArchiveUseCase',
	VENUE_UNARCHIVE_USE_CASE: 'VenueUnarchiveUseCase',

	LAUNCH_CONTROL: 'LaunchControl',

	AUTH_SERVICE: 'AuthService',
	AUTH_TOKEN_FACTORY: 'AuthTokenFactory',

	API_CLIENT: 'ApiClient',
	API_CLIENT_CONFIG_PROVIDER: 'ApiClientConfigProvider',

	AUTH_API: 'AuthApi',
	EXPENSE_API: 'ExpensesApi',

	USER_SERVICE: 'UserService',
	USER_DATASOURCE: 'UserDataSource',
	USER_MAPPER: 'UserMapper',
	USER_REPOSITORY: 'UserRepository',

	TEMPORAL: 'Temporal',

	EXPENSE_CREATE_USE_CASE: 'ExpenseCreateUseCase',
	EXPENSE_UPDATE_USE_CASE: 'ExpenseUpdateUseCase',
	EXPENSE_DELETE_USE_CASE: 'ExpenseDeleteUseCase',

	SYNC_SERVICE: 'SyncService',
} as const;

export interface IServiceMap {
	[EServiceToken.GLOBAL]: typeof Window;
	[EServiceToken.LOCAL_STORAGE]: IStorage;

	[EServiceToken.PROCESS_ENV]: TMetaEnv;
	[EServiceToken.ENVIRONMENT]: IEnvironment;

	[EServiceToken.DATABASE]: IDatabase;
	[EServiceToken.DATABASE_COLLECTION_FACTORY]: IDatabaseCollectionFactory;

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
	[EServiceToken.SESSION_FACTORY]: ISessionFactory;

	[EServiceToken.CLIENT_ID]: IClientId;
	[EServiceToken.CLIENT_ID_FACTORY]: IClientIdFactory;

	[EServiceToken.CATEGORY_SERVICE]: ICategoryService;
	[EServiceToken.CATEGORY_REPOSITORY]: ICategoryRepository;
	[EServiceToken.CATEGORY_DATASOURCE]: ICategoryDataSource;
	[EServiceToken.CATEGORY_MAPPER]: ICategoryMapper;
	[EServiceToken.CATEGORY_USE_CASE]: ICategoryUseCase;
	[EServiceToken.CATEGORY_CREATE_USE_CASE]: ICategoryCreateUseCase;
	[EServiceToken.CATEGORY_UPDATE_USE_CASE]: ICategoryUpdateUseCase;
	[EServiceToken.CATEGORY_DELETE_USE_CASE]: ICategoryDeleteUseCase;
	[EServiceToken.CATEGORY_WEIGHT_USE_CASE]: ICategoryWeightUseCase;
	[EServiceToken.CATEGORY_INITIALIZE_USE_CASE]: ICategoryInitializeUseCase;
	[EServiceToken.CATEGORY_QUERY_SERVICE]: ICategoryQueryService;

	[EServiceToken.EXPENSE_REPOSITORY]: IExpenseRepository;
	[EServiceToken.EXPENSE_DATASOURCE]: IExpenseDataSource;
	[EServiceToken.EXPENSE_SERVICE]: IExpenseService;
	[EServiceToken.EXPENSE_MAPPER]: IExpenseMapper;
	[EServiceToken.EXPENSE_GROUPING_SERVICE]: IExpenseGroupingService;
	[EServiceToken.EXPENSE_AMOUNT_SERVICE]: IExpenseAmountService;
	[EServiceToken.EXPENSE_QUERY_SERVICE]: IExpenseQueryService;
	[EServiceToken.EXPENSE_USE_CASE]: IExpenseUseCase;
	[EServiceToken.EXPENSE_CREATE_USE_CASE]: ICreateExpenseUseCase;
	[EServiceToken.EXPENSE_UPDATE_USE_CASE]: IUpdateExpenseUseCase;
	[EServiceToken.EXPENSE_DELETE_USE_CASE]: IDeleteExpenseUseCase;

	[EServiceToken.VENUE_REPOSITORY]: IVenueRepository;
	[EServiceToken.VENUE_DATASOURCE]: IVenueDataSource;
	[EServiceToken.VENUE_MAPPER]: IVenueMapper;
	[EServiceToken.VENUE_QUERY_SERVICE]: IVenueQueryService;
	[EServiceToken.VENUE_USE_CASE]: IVenueUseCase;
	[EServiceToken.VENUE_CREATE_USE_CASE]: IVenueCreateUseCase;
	[EServiceToken.VENUE_DELETE_USE_CASE]: IVenueDeleteUseCase;
	[EServiceToken.VENUE_ARCHIVE_USE_CASE]: IVenueArchiveUseCase;
	[EServiceToken.VENUE_UNARCHIVE_USE_CASE]: IVenueUnarchiveUseCase;

	[EServiceToken.APP_CONFIG_DATASOURCE]: IAppConfigDataSource;
	[EServiceToken.APP_CONFIG_SERVICE]: IAppConfigService;

	[EServiceToken.CURRENCY_RATE_API]: ICurrencyRateAPI;
	[EServiceToken.CURRENCY_RATE_REPOSITORY]: ICurrencyRateRepository;

	[EServiceToken.LAUNCH_CONTROL]: ILauchControl;

	[EServiceToken.API_CLIENT]: IApiClient;
	[EServiceToken.API_CLIENT_CONFIG_PROVIDER]: IApiClientConfigProvider;

	[EServiceToken.EXPENSE_API]: IExpenseApi;

	[EServiceToken.AUTH_API]: IAuthApi;
	[EServiceToken.AUTH_SERVICE]: IAuthSerivce;
	[EServiceToken.AUTH_TOKEN_FACTORY]: IAuthTokenFactory;

	[EServiceToken.USER_SERVICE]: IUserService;
	[EServiceToken.USER_DATASOURCE]: IUserDataSource;
	[EServiceToken.USER_MAPPER]: IUserMapper;
	[EServiceToken.USER_REPOSITORY]: IUserRepository;

	[EServiceToken.CURRENCY_RATE_DATASOURCE]: ICurrencyRateDataSource;
	[EServiceToken.CURRENCY_RATE_SERVICE]: ICurrencyRateService;

	[EServiceToken.TEMPORAL]: ITemporal;

	[EServiceToken.SYNC_SERVICE]: ISyncService;
}
