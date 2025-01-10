import { Environment } from '@root/core/modules/settings/infrastructure/environment/environment';

import { AppConfig } from '@root/core/modules/settings/domain/appConfig/appConfig';
import { CurrencyConverter } from '@root/core/modules/currency/application/currencyConverter/currencyConverter';
import { CurrencyRateService } from '@root/core/modules/currency/application/currencyRateService/currencyRateService';
import { ECurrency } from '@root/core/modules/currency/domain/types';
import { ELocaleCode } from '@root/core/modules/intl/domain/enums';
import { IntlService } from '@root/core/modules/intl/application/intlService/intlService';

import { Container } from '@root/core/infrastructure/serviceContainer/container';
import {
	EServiceToken,
	type IContainer,
} from '@root/core/infrastructure/serviceContainer/types';
import { NumberParser } from '@root/core/modules/intl/infrastructure/numberParser/numberParser';
import {
	IdGeneratorFactory,
	type IIdGeneratorFactory,
} from '@core/infrastructure/idGenerator/factory';
import {
	CategoryServiceFactory,
	type ICategoryServiceFactory,
} from '@root/core/modules/category/application/categoryService/factory';
import { AppConfigDataSource } from '@root/core/modules/settings/infrastructure/appConfigDataSource/appConfigDataSource';
import { AppConfigService } from '@root/core/modules/settings/application/appConfigService/appConfigService';
import { CurrencyRateAPI } from '@root/core/modules/currency/infrastructure/currencyRateAPI/currencyRateAPI';
import { AuthApi } from '@root/core/modules/identity/infrastructure/authApi/authApi';
import { UserDataSource } from '@root/core/modules/user/infrastructure/userDataSource/userDataSource';
import { AuthService } from '@root/core/modules/identity/application/authService/authService';
import { CurrencyRateDataSource } from '@root/core/modules/currency/infrastructure/currencyRateDataSource/currencyRateDataSource';
import { ExpenseApi } from '@root/core/modules/expense/infrastructure/expenseApi/expenseApi';
import { Temporal } from '@root/core/infrastructure/temporal/temporal';
import { CreateExpenseUseCase } from '@root/core/modules/expense/application/expenseUseCases/createExpenseUseCase';
import { UpdateExpenseUseCase } from '@root/core/modules/expense/application/expenseUseCases/updateExpenseUseCase';
import { DeleteExpenseUseCase } from '@root/core/modules/expense/application/expenseUseCases/deleteExpenseUseCase';
import { ExpenseRepository } from '@root/core/modules/expense/infrastructure/expenseRepository/expenseRepository';
import { ExpenseDataSource } from '@root/core/modules/expense/infrastructure/expenseDataSource/expenseDataSource';
import { ExpenseService } from '@root/core/modules/expense/application/expenseService/expenseService';
import { CategoryRepository } from '@root/core/modules/category/infrastructure/categoryRepository/categoryRepository';
import { CategoryInMemoryDataSource } from '@root/core/modules/category/infrastructure/categoryDataSource/categoryDataSource';
import { ApiClient } from '@root/core/infrastructure/apiClient/apiClient';
import { CurrencyRateRepository } from '@root/core/modules/currency/infrastructure/currencyRateRepository/currencyRateRepository';
import { CurrencyFormatter } from '@root/core/modules/intl/infrastructure/currencyFormatter/currencyFormatter';
import { DateFormatter } from '@root/core/modules/intl/infrastructure/dateFormatter/dateFormatter';
import { ClientIdFactory } from '@root/core/modules/identity/domain/clientId/clientIdFactory';
import type { IClientIdFactory } from '@root/core/modules/identity/domain/clientId/types';
import { UserService } from '@root/core/modules/user/application/userService/userService';
import { LaunchControl } from '@root/core/modules/bootstrap/application/launchControl/launchControl';
import { ExpenseMapper } from '@root/core/modules/expense/infrastructure/expenseMapper/expenseMapper';
import { CategoryMapper } from '@root/core/modules/category/infrastructure/categoryMapper/categoryMapper';
import { UserMapper } from '@root/core/modules/user/infrastructure/userMapper/userMapper';
import { UserRepository } from '@root/core/modules/user/infrastructure/userRepository/userRepository';
import { SessionService } from '@root/core/modules/identity/application/sessionService/sessionService';
import { sessionDataSourceFactory } from '@root/core/modules/identity/infrastructure/sessionDataSource/sessionDataSourceFactory';
import { SessionFactory } from '@root/core/modules/identity/domain/session/sessionFactory';
import { SyncService } from '@root/core/modules/sync/application/syncService/syncService';
import { AuthTokenFactory } from '@root/core/modules/identity/domain/authToken/authTokenFactory';
import { ApiClientConfigProvider } from '@root/core/infrastructure/apiClient/configProvider';
import { ExpenseGroupingService } from '@root/core/modules/expense/application/expenseGroupingService/expenseGroupingService';
import { ExpenseAmountService } from '@root/core/modules/expense/application/expenseAmountService/expenseAmountService';
import { ExpenseQueryService } from '@root/core/modules/expense/application/expenseQueryService/expenseQueryService';
import { ExpenseUseCase } from '@root/core/modules/expense/application/expenseUseCases/expenseUseCase';
import { CategoryUseCase } from '@root/core/modules/category/application/categoryUseCase/categoryUseCase';
import { CategoryCreateUseCase } from '@root/core/modules/category/application/categoryUseCase/categoryCreateUseCase';
import { CategoryDeleteUseCase } from '@root/core/modules/category/application/categoryUseCase/categoryDeleteUseCase';
import { CategoryUpdateUseCase } from '@root/core/modules/category/application/categoryUseCase/categoryUpdateUseCase';
import { CategoryWeightUseCase } from '@root/core/modules/category/application/categoryUseCase/categoryWeightUseCase';

let globalContainer: IContainer;

export function createDIContainer(options?: { isGlobal?: boolean }) {
	let container = new Container();

	if (options?.isGlobal) {
		globalContainer = container;
	}

	container
		/**
		 * @description Environment and configuration
		 */
		.register(
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
				token: EServiceToken.APP_CONFIG,
				useFactory: () => {
					return new AppConfig(ELocaleCode.RU_RU, ECurrency.USD);
				},
			},
			{
				token: EServiceToken.APP_CONFIG_DATASOURCE,
				useClass: AppConfigDataSource,
			},
			{
				token: EServiceToken.APP_CONFIG_SERVICE,
				useClass: AppConfigService,
				deps: [EServiceToken.APP_CONFIG, EServiceToken.APP_CONFIG_DATASOURCE],
			},
		)
		/**
		 * @description Base services
		 */
		.register(
			{
				token: EServiceToken.NUMBER_PARSER,
				useClass: NumberParser,
				deps: [EServiceToken.APP_CONFIG],
			},
			{
				token: EServiceToken.CURRENCY_FORMATTER,
				useClass: CurrencyFormatter,
			},
			{
				token: EServiceToken.DATE_FORMATTER,
				useClass: DateFormatter,
			},
			{
				token: EServiceToken.INTL_SERVICE,
				useClass: IntlService,
				deps: [
					EServiceToken.APP_CONFIG,
					EServiceToken.NUMBER_PARSER,
					EServiceToken.CURRENCY_FORMATTER,
					EServiceToken.DATE_FORMATTER,
				],
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
		)
		/**
		 * @description Authentication and user management
		 */
		.register(
			/** Launch control */
			{
				token: EServiceToken.LAUNCH_CONTROL,
				useClass: LaunchControl,
				deps: [
					EServiceToken.SESSION_SERVICE,
					EServiceToken.APP_CONFIG_SERVICE,
					EServiceToken.CURRENCY_RATE_API,
					EServiceToken.CURRENCY_RATE_DATASOURCE,
				],
			},

			/** Session */
			{
				token: EServiceToken.SESSION_DATASOURCE,
				useFactory: sessionDataSourceFactory,
			},
			{
				token: EServiceToken.SESSION_SERVICE,
				useClass: SessionService,
				deps: [EServiceToken.SESSION_DATASOURCE, EServiceToken.SESSION_FACTORY],
			},
			{
				token: EServiceToken.SESSION_FACTORY,
				useClass: SessionFactory,
				deps: [EServiceToken.CLIENT_ID_FACTORY, EServiceToken.USER_SERVICE],
			},

			/** ClientId */
			{
				token: EServiceToken.CLIENT_ID,
				useFactory: (clientIdFactory: IClientIdFactory) => {
					return clientIdFactory.create();
				},
				deps: [EServiceToken.CLIENT_ID_FACTORY],
			},
			{
				token: EServiceToken.CLIENT_ID_FACTORY,
				useClass: ClientIdFactory,
				deps: [EServiceToken.ID_GENERATOR],
			},

			/** Authentication */
			{
				token: EServiceToken.AUTH_API,
				useClass: AuthApi,
				deps: [EServiceToken.API_CLIENT],
			},
			{
				token: EServiceToken.AUTH_SERVICE,
				useClass: AuthService,
				deps: [
					EServiceToken.AUTH_API,
					EServiceToken.USER_SERVICE,
					EServiceToken.SESSION_SERVICE,
				],
			},
			{
				token: EServiceToken.AUTH_TOKEN_FACTORY,
				useClass: AuthTokenFactory,
			},

			/** User */
			{
				token: EServiceToken.USER_DATASOURCE,
				useClass: UserDataSource,
			},
			{
				token: EServiceToken.USER_SERVICE,
				useClass: UserService,
				deps: [
					EServiceToken.USER_REPOSITORY,
					EServiceToken.USER_MAPPER,
					EServiceToken.ID_GENERATOR,
					EServiceToken.TEMPORAL,
				],
			},
			{
				token: EServiceToken.USER_MAPPER,
				useClass: UserMapper,
			},
			{
				token: EServiceToken.USER_REPOSITORY,
				useClass: UserRepository,
				deps: [EServiceToken.USER_DATASOURCE, EServiceToken.USER_MAPPER],
			},
		)
		/**
		 * @description Currency converter and exchange rates
		 */
		.register(
			{
				token: EServiceToken.CURRENCY_RATE_DATASOURCE,
				useClass: CurrencyRateDataSource,
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
		)
		/**
		 * @description Expenses
		 */
		.register(
			{
				token: EServiceToken.EXPENSE_MAPPER,
				useClass: ExpenseMapper,
			},
			{
				token: EServiceToken.EXPENSE_REPOSITORY,
				useClass: ExpenseRepository,
				deps: [EServiceToken.EXPENSE_DATASOURCE, EServiceToken.EXPENSE_MAPPER],
			},
			{
				token: EServiceToken.EXPENSE_DATASOURCE,
				useClass: ExpenseDataSource,
			},
			{
				token: EServiceToken.EXPENSE_API,
				useClass: ExpenseApi,
				deps: [EServiceToken.API_CLIENT],
			},
			{
				token: EServiceToken.EXPENSE_CREATE_USE_CASE,
				useClass: CreateExpenseUseCase,
				deps: [
					EServiceToken.EXPENSE_REPOSITORY,
					EServiceToken.CATEGORY_SERVICE,
					EServiceToken.SESSION_SERVICE,
					EServiceToken.ID_GENERATOR,
					EServiceToken.TEMPORAL,
				],
			},
			{
				token: EServiceToken.EXPENSE_UPDATE_USE_CASE,
				useClass: UpdateExpenseUseCase,
				deps: [
					EServiceToken.EXPENSE_REPOSITORY,
					EServiceToken.CATEGORY_SERVICE,
				],
			},
			{
				token: EServiceToken.EXPENSE_DELETE_USE_CASE,
				useClass: DeleteExpenseUseCase,
				deps: [
					EServiceToken.EXPENSE_REPOSITORY,
					EServiceToken.CATEGORY_SERVICE,
				],
			},
			{
				token: EServiceToken.EXPENSE_SERVICE,
				useClass: ExpenseService,
				deps: [
					EServiceToken.EXPENSE_GROUPING_SERVICE,
					EServiceToken.EXPENSE_AMOUNT_SERVICE,
					EServiceToken.EXPENSE_QUERY_SERVICE,
				],
			},
			{
				token: EServiceToken.EXPENSE_GROUPING_SERVICE,
				useClass: ExpenseGroupingService,
			},
			{
				token: EServiceToken.EXPENSE_AMOUNT_SERVICE,
				useClass: ExpenseAmountService,
				deps: [EServiceToken.APP_CONFIG, EServiceToken.CURRENCY_RATE_SERVICE],
			},
			{
				token: EServiceToken.EXPENSE_QUERY_SERVICE,
				useClass: ExpenseQueryService,
				deps: [
					EServiceToken.EXPENSE_REPOSITORY,
					EServiceToken.EXPENSE_MAPPER,
					EServiceToken.TEMPORAL,
				],
			},
			{
				token: EServiceToken.EXPENSE_USE_CASE,
				useClass: ExpenseUseCase,
				deps: [
					EServiceToken.EXPENSE_CREATE_USE_CASE,
					EServiceToken.EXPENSE_UPDATE_USE_CASE,
					EServiceToken.EXPENSE_DELETE_USE_CASE,
				],
			},
		)
		/**
		 * @description Category
		 */
		.register(
			{
				token: EServiceToken.CATEGORY_DATASOURCE,
				useClass: CategoryInMemoryDataSource,
			},
			{
				token: EServiceToken.CATEGORY_REPOSITORY,
				useClass: CategoryRepository,
				deps: [
					EServiceToken.CATEGORY_DATASOURCE,
					EServiceToken.CATEGORY_MAPPER,
				],
			},
			{
				token: EServiceToken.CATEGORY_MAPPER,
				useClass: CategoryMapper,
			},
			{
				token: EServiceToken.CATEGORY_SERVICE_FACTORY,
				useClass: CategoryServiceFactory,
				deps: [
					EServiceToken.CATEGORY_REPOSITORY,
					EServiceToken.CATEGORY_MAPPER,
					EServiceToken.TEMPORAL,
					EServiceToken.EXPENSE_REPOSITORY,
					EServiceToken.CATEGORY_USE_CASE,
				],
			},
			{
				token: EServiceToken.CATEGORY_SERVICE,
				useFactory: (categoryServiceFactory: ICategoryServiceFactory) => {
					return categoryServiceFactory.create();
				},
				deps: [EServiceToken.CATEGORY_SERVICE_FACTORY],
			},
			{
				token: EServiceToken.CATEGORY_USE_CASE,
				useClass: CategoryUseCase,
				deps: [
					EServiceToken.CATEGORY_CREATE_USE_CASE,
					EServiceToken.CATEGORY_UPDATE_USE_CASE,
					EServiceToken.CATEGORY_DELETE_USE_CASE,
					EServiceToken.CATEGORY_WEIGHT_USE_CASE,
				],
			},
			{
				token: EServiceToken.CATEGORY_CREATE_USE_CASE,
				useClass: CategoryCreateUseCase,
				deps: [
					EServiceToken.ID_GENERATOR,
					EServiceToken.TEMPORAL,
					EServiceToken.CATEGORY_MAPPER,
					EServiceToken.CATEGORY_REPOSITORY,
				],
			},
			{
				token: EServiceToken.CATEGORY_UPDATE_USE_CASE,
				useClass: CategoryUpdateUseCase,
			},
			{
				token: EServiceToken.CATEGORY_DELETE_USE_CASE,
				useClass: CategoryDeleteUseCase,
			},
			{
				token: EServiceToken.CATEGORY_WEIGHT_USE_CASE,
				useClass: CategoryWeightUseCase,
				deps: [EServiceToken.CATEGORY_REPOSITORY],
			},
		)
		.register({
			token: EServiceToken.SYNC_SERVICE,
			useClass: SyncService,
		})
		.validate();

	return container;
}

export function getGlobalContainer(): IContainer {
	if (!globalContainer) {
		throw new Error('GlobalContainer Not Initialized');
	}

	return globalContainer;
}
