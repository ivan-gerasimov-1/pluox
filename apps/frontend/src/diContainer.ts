import { environment, type TEnvironment } from '@root/config';

import {
	AppConfig,
	type IAppConfig,
} from '@core/infrastructure/appConfig/AppConfig';
import { CurrencyConverter } from '@root/core/modules/currency/application/currencyConverter/currencyConverter';
import { CurrencyRates } from '@root/core/modules/currency/application/currencyRates/CurrencyRates';
import { ECurrency } from '@root/core/modules/currency/domain/types';
import { ELocaleCode } from '@core/infrastructure/intl/enums';
import { IntlService } from '@core/infrastructure/intl/intlService/IntlService';

import { Container } from '@root/core/infrastructure/serviceContainer/container';
import {
	EServiceToken,
	type IContainer,
} from '@root/core/infrastructure/serviceContainer/types';
import { NumberParser } from '@core/infrastructure/intl/numberParser/NumberParser';
import {
	IdGeneratorFactory,
	type IIdGeneratorFactory,
} from '@core/infrastructure/idGenerator/factory';
import { ClientIdStorage } from '@core/infrastructure/clientIdStorage/ClientIdStorage';
import { ClientId } from '@core/infrastructure/clientId/ClientId';
import {
	CategoryServiceFactory,
	type ICategoryServiceFactory,
} from '@root/core/modules/category/application/categoryService/factory';
import { AppConfigStorage } from '@core/infrastructure/appConfigStorage/AppConfigStorage';
import { AppConfigService } from '@core/infrastructure/appConfigService/AppConfigService';
import { AppConfigStore } from '@root/presentation/web-ui/modules/appConfig/appConfig.store';
import { CurrencyRatesAPI } from '@root/core/modules/currency/infrastructure/currencyRatesAPI/CurrencyRatesAPI';
import { AuthStorage } from '@core/infrastructure/authStorage/AuthStorage';
import { AuthApi } from '@core/infrastructure/authApi/AuthApi';
import { UserStorage } from '@core/infrastructure/userStorage/UserStorage';
import { AuthService } from '@core/infrastructure/authService/AuthService';
import { CurrencyRatesStorage } from '@root/core/modules/currency/infrastructure/currencyRatesStorage/CurrencyRatesStorage';
import { ExpenseApi } from '@root/core/modules/expense/infrastructure/expenseApi/expenseApi';
import { TotalAmountUseCase } from '@root/core/modules/expense/domain/expenseUseCases/totalAmountUseCase/totalAmountUseCase';
import { Temporal } from '@root/core/infrastructure/temporal/temporal';
import { CreateExpenseUseCase } from '@root/core/modules/expense/domain/expenseUseCases/createExpenseUseCase';
import { UpdateExpenseUseCase } from '@root/core/modules/expense/domain/expenseUseCases/updateExpenseUseCase';
import { DeleteExpenseUseCase } from '@root/core/modules/expense/domain/expenseUseCases/deleteExpenseUseCase';
import { ExpenseRepository } from '@root/core/modules/expense/infrastructure/expenseRepository/expenseRepository';
import { ExpenseDataSource } from '@root/core/modules/expense/infrastructure/expenseDataSource/expenseDataSource';
import { MonthlyExpensesByCategoryUseCase } from '@root/core/modules/expense/domain/expenseUseCases/monthlyExpensesByCategoryUseCase';
import { ExpenseService } from '@root/core/modules/expense/application/expenseService/expenseService';
import { GroupExpenseByDateUseCase } from '@root/core/modules/expense/domain/expenseUseCases/groupExpensesByDayUseCase';
import { CategoryRepository } from '@root/core/modules/category/infrastructure/categoryRepository/categoryRepository';
import { CategoryInMemoryDataSource } from '@root/core/modules/category/infrastructure/categoryDataSource/categoryDataSource';
import { BaseApi } from '@root/core/infrastructure/baseApi/baseApi';

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
				token: EServiceToken.ENVIRONMENT,
				useValue: environment,
			},
			{
				token: EServiceToken.APP_CONFIG,
				useFactory: (environment: TEnvironment) => {
					let apiUrl = environment.apiUrl;

					return new AppConfig(ELocaleCode.RU_RU, ECurrency.USD, apiUrl);
				},
				deps: [EServiceToken.ENVIRONMENT],
			},
			{
				token: EServiceToken.APP_CONFIG_STORAGE,
				useClass: AppConfigStorage,
			},
			{
				token: EServiceToken.APP_CONFIG_SERVICE,
				useClass: AppConfigService,
				deps: [EServiceToken.APP_CONFIG, EServiceToken.APP_CONFIG_STORAGE],
			},
			{
				token: EServiceToken.APP_CONFIG_STORE,
				useClass: AppConfigStore,
				deps: [EServiceToken.APP_CONFIG, EServiceToken.APP_CONFIG_SERVICE],
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
				token: EServiceToken.INTL_SERVICE,
				useClass: IntlService,
				deps: [EServiceToken.APP_CONFIG, EServiceToken.NUMBER_PARSER],
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
				token: EServiceToken.BASE_API,
				useClass: BaseApi,
				deps: [EServiceToken.APP_CONFIG, EServiceToken.AUTH_STORAGE],
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
			{
				token: EServiceToken.AUTH_STORAGE,
				useClass: AuthStorage,
			},
			{
				token: EServiceToken.AUTH_API,
				useClass: AuthApi,
				deps: [EServiceToken.BASE_API],
			},
			{
				token: EServiceToken.AUTH_SERVICE,
				useClass: AuthService,
				deps: [
					EServiceToken.AUTH_API,
					EServiceToken.AUTH_STORAGE,
					EServiceToken.USER_STORAGE,
				],
			},
			{
				token: EServiceToken.USER_STORAGE,
				useClass: UserStorage,
			},
			{
				token: EServiceToken.CLIENT_ID_STORAGE,
				useClass: ClientIdStorage,
			},
			{
				token: EServiceToken.CLIENT_ID,
				useClass: ClientId,
				deps: [EServiceToken.ID_GENERATOR, EServiceToken.CLIENT_ID_STORAGE],
			},
		)
		/**
		 * @description Currency converter and exchange rates
		 */
		.register(
			{
				token: EServiceToken.CURRENCY_RATES_STORAGE,
				useClass: CurrencyRatesStorage,
			},
			{
				token: EServiceToken.CURRENCY_RATES,
				useClass: CurrencyRates,
				deps: [EServiceToken.CURRENCY_RATES_STORAGE],
			},
			{
				token: EServiceToken.CURRENCY_CONVERTER,
				useClass: CurrencyConverter,
				deps: [EServiceToken.CURRENCY_RATES],
			},
			{
				token: EServiceToken.CURRENCY_RATES_API,
				useFactory: (appConfig: IAppConfig) => {
					return new CurrencyRatesAPI(
						appConfig.openExchangeRates.apiUrl,
						appConfig.openExchangeRates.apiKey,
						appConfig.availabelCurrencies,
					);
				},
				deps: [EServiceToken.APP_CONFIG],
			},
		)
		/**
		 * @description Expenses
		 */
		.register(
			{
				token: EServiceToken.EXPENSE_REPOSITORY,
				useClass: ExpenseRepository,
				deps: [EServiceToken.EXPENSE_DATASOURCE],
			},
			{
				token: EServiceToken.EXPENSE_DATASOURCE,
				useClass: ExpenseDataSource,
			},
			{
				token: EServiceToken.EXPENSES_API,
				useClass: ExpenseApi,
				deps: [EServiceToken.BASE_API],
			},
			{
				token: EServiceToken.EXPENSE_CREATE_USE_CASE,
				useClass: CreateExpenseUseCase,
				deps: [EServiceToken.ID_GENERATOR, EServiceToken.TEMPORAL],
			},
			{
				token: EServiceToken.EXPENSE_UPDATE_USE_CASE,
				useClass: UpdateExpenseUseCase,
			},
			{
				token: EServiceToken.EXPENSE_DELETE_USE_CASE,
				useClass: DeleteExpenseUseCase,
				deps: [EServiceToken.EXPENSE_REPOSITORY],
			},
			{
				token: EServiceToken.MONTHLY_EXPENSES_BY_CATEGORY_USE_CASE,
				useClass: MonthlyExpensesByCategoryUseCase,
				deps: [
					EServiceToken.APP_CONFIG,
					EServiceToken.EXPENSE_REPOSITORY,
					EServiceToken.CURRENCY_CONVERTER,
					EServiceToken.TEMPORAL,
				],
			},
			{
				token: EServiceToken.TOTAL_AMOUNT_USE_CASE,
				useClass: TotalAmountUseCase,
				deps: [
					EServiceToken.EXPENSE_REPOSITORY,
					EServiceToken.CURRENCY_CONVERTER,
				],
			},
			{
				token: EServiceToken.GROUP_EXPENSE_BY_DATE_USE_CASE,
				useClass: GroupExpenseByDateUseCase,
			},
			{
				token: EServiceToken.EXPENSE_SERVICE,
				useClass: ExpenseService,
				deps: [
					EServiceToken.APP_CONFIG,
					EServiceToken.EXPENSE_REPOSITORY,
					EServiceToken.CATEGORY_SERVICE,
					EServiceToken.EXPENSE_CREATE_USE_CASE,
					EServiceToken.EXPENSE_DELETE_USE_CASE,
					EServiceToken.EXPENSE_UPDATE_USE_CASE,
					EServiceToken.TOTAL_AMOUNT_USE_CASE,
					EServiceToken.MONTHLY_EXPENSES_BY_CATEGORY_USE_CASE,
					EServiceToken.GROUP_EXPENSE_BY_DATE_USE_CASE,
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
				deps: [EServiceToken.CATEGORY_DATASOURCE],
			},
			{
				token: EServiceToken.CATEGORY_SERVICE_FACTORY,
				useClass: CategoryServiceFactory,
				deps: [
					EServiceToken.CATEGORY_REPOSITORY,
					EServiceToken.TEMPORAL,
					EServiceToken.EXPENSE_REPOSITORY,
				],
			},
			{
				token: EServiceToken.CATEGORY_SERVICE,
				useFactory: (categoryServiceFactory: ICategoryServiceFactory) => {
					return categoryServiceFactory.create();
				},
				deps: [EServiceToken.CATEGORY_SERVICE_FACTORY],
			},
		)
		.validate();

	return container;
}

export function getGlobalContainer(): IContainer {
	if (!globalContainer) {
		throw new Error('GlobalContainer Not Initialized');
	}

	return globalContainer;
}
