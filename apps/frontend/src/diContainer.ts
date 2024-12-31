import { environment } from '@root/core/modules/settings/config';

import { AppConfig } from '@root/core/modules/settings/appConfig/appConfig';
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
import { ClientIdDataSource } from '@root/core/modules/identity/clientIdDataSource/clientIdDataSource';
import { ClientId } from '@root/core/modules/identity/clientId/clientId';
import {
	CategoryServiceFactory,
	type ICategoryServiceFactory,
} from '@root/core/modules/category/application/categoryService/factory';
import { AppConfigDataSource } from '@root/core/modules/settings/appConfigDataSource/appConfigDataSource';
import { AppConfigService } from '@root/core/modules/settings/appConfigService/appConfigService';
import { CurrencyRateAPI } from '@root/core/modules/currency/infrastructure/currencyRateAPI/CurrencyRatesAPI';
import { AuthDataSource } from '@root/core/modules/identity/authDataSource/authDataSource';
import { AuthApi } from '@root/core/modules/identity/authApi/authApi';
import { UserDataSource } from '@root/core/modules/identity/userDataSource/userDataSource';
import { AuthService } from '@root/core/modules/identity/authService/authService';
import { CurrencyRateDataSource } from '@root/core/modules/currency/infrastructure/currencyRateDataSource/currencyRateDataSource';
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
import { CurrencyRateRepository } from '@root/core/modules/currency/infrastructure/currencyRateRepository/currencyRateRepository';
import { DailyAmountUseCase } from '@root/core/modules/expense/domain/expenseUseCases/dailyAmountUseCase';
import { CurrencyFormatter } from '@root/core/modules/intl/infrastructure/numberParser/currencyFormatter/currencyFormatter';

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
				token: EServiceToken.INTL_SERVICE,
				useClass: IntlService,
				deps: [
					EServiceToken.APP_CONFIG,
					EServiceToken.NUMBER_PARSER,
					EServiceToken.CURRENCY_FORMATTER,
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
				token: EServiceToken.BASE_API,
				useClass: BaseApi,
				deps: [EServiceToken.ENVIRONMENT, EServiceToken.AUTH_DATASOURCE],
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
				token: EServiceToken.AUTH_DATASOURCE,
				useClass: AuthDataSource,
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
					EServiceToken.AUTH_DATASOURCE,
					EServiceToken.USER_DATASOURCE,
				],
			},
			{
				token: EServiceToken.USER_DATASOURCE,
				useClass: UserDataSource,
			},
			{
				token: EServiceToken.CLIENT_ID_DATASOURCE,
				useClass: ClientIdDataSource,
			},
			{
				token: EServiceToken.CLIENT_ID,
				useClass: ClientId,
				deps: [EServiceToken.ID_GENERATOR, EServiceToken.CLIENT_ID_DATASOURCE],
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
				token: EServiceToken.EXPENSE_REPOSITORY,
				useClass: ExpenseRepository,
				deps: [EServiceToken.EXPENSE_DATASOURCE],
			},
			{
				token: EServiceToken.EXPENSE_DATASOURCE,
				useClass: ExpenseDataSource,
			},
			{
				token: EServiceToken.EXPENSE_API,
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
					EServiceToken.CURRENCY_RATE_SERVICE,
					EServiceToken.TEMPORAL,
				],
			},
			{
				token: EServiceToken.TOTAL_AMOUNT_USE_CASE,
				useClass: TotalAmountUseCase,
				deps: [
					EServiceToken.EXPENSE_REPOSITORY,
					EServiceToken.CURRENCY_RATE_SERVICE,
				],
			},
			{
				token: EServiceToken.DAILY_AMOUNT_USE_CASE,
				useClass: DailyAmountUseCase,
				deps: [
					EServiceToken.EXPENSE_REPOSITORY,
					EServiceToken.TEMPORAL,
					EServiceToken.CURRENCY_RATE_SERVICE,
					EServiceToken.APP_CONFIG,
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
					EServiceToken.DAILY_AMOUNT_USE_CASE,
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
