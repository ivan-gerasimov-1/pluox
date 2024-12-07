import { environment, type TEnvironment } from '@root/config';

import {
	AppConfig,
	type IAppConfig,
} from '@core/infrastructure/appConfig/AppConfig';
import { CurrencyConverter } from '@core/infrastructure/currency/currencyConverter/currencyConverter';
import { CurrencyRates } from '@core/infrastructure/currency/currencyRates/CurrencyRates';
import { ECurrency } from '@core/infrastructure/currency/types';
import { ELocaleCode } from '@core/infrastructure/intl/enums';
import { IntlService } from '@core/infrastructure/intl/intlService/IntlService';

import { Container } from '@modules/serviceContainer/container';
import {
	EServiceToken,
	type IContainer,
} from '@modules/serviceContainer/types';
import { NumberParser } from '@core/infrastructure/intl/numberParser/NumberParser';
import { idGeneratorFactory } from '@core/infrastructure/idGenerator/factory';
import { ClientIdStorage } from '@core/infrastructure/clientIdStorage/ClientIdStorage';
import { ClientId } from '@core/infrastructure/clientId/ClientId';
import { categoriesFactory } from '@domain/categories/factory';
import { Expenses } from '@domain/expenses/expenses';
import { AppConfigStorage } from '@core/infrastructure/appConfigStorage/AppConfigStorage';
import { AppConfigService } from '@core/infrastructure/appConfigService/AppConfigService';
import { AppConfigStore } from '@modules/appConfig/appConfig.store';
import { CurrencyRatesAPI } from '@core/infrastructure/currency/currencyRatesAPI/CurrencyRatesAPI';
import { AuthStorage } from '@core/infrastructure/authStorage/AuthStorage';
import { BaseApi } from '@core/infrastructure/baseApi/BaseApi';
import { AuthApi } from '@core/infrastructure/authApi/AuthApi';
import { UserStorage } from '@core/infrastructure/userStorage/UserStorage';
import { AuthService } from '@core/infrastructure/authService/AuthService';
import { ExpensesStorage } from '@core/infrastructure/expensesStorage/ExpensesStorage';
import { CurrencyRatesStorage } from '@core/infrastructure/currency/currencyRatesStorage/CurrencyRatesStorage';
import { ExpensesApi } from '@core/infrastructure/expensesApi/ExpensesApi';
import { TotalAmountUseCase } from '@domain/amount/useCases/totalAmountUseCase';
import { Amount } from '@domain/amount/Amount';

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
				token: EServiceToken.ID_GENERATOR,
				useFactory: idGeneratorFactory,
			},
			{
				token: EServiceToken.BASE_API,
				useClass: BaseApi,
				deps: [EServiceToken.APP_CONFIG, EServiceToken.AUTH_STORAGE],
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
				token: EServiceToken.EXPENSES,
				useClass: Expenses,
				deps: [EServiceToken.APP_CONFIG, EServiceToken.CATEGORIES],
			},
			{
				token: EServiceToken.EXPENSES_STORAGE,
				useClass: ExpensesStorage,
			},
			{
				token: EServiceToken.EXPENSES_API,
				useClass: ExpensesApi,
				deps: [EServiceToken.BASE_API],
			},
		)
		/**
		 * @description Categories
		 */
		.register({
			token: EServiceToken.CATEGORIES,
			useFactory: categoriesFactory,
		})
		/**
		 * @description Amount and use cases
		 */
		.register(
			{
				token: EServiceToken.AMOUNT,
				useClass: Amount,
				deps: [EServiceToken.APP_CONFIG, EServiceToken.TOTAL_AMOUNT_USE_CASE],
			},
			{
				token: EServiceToken.TOTAL_AMOUNT_USE_CASE,
				useClass: TotalAmountUseCase,
				deps: [EServiceToken.EXPENSES, EServiceToken.CURRENCY_CONVERTER],
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
