import { environment, type TEnvironment } from '@root/config';

import { AppConfig } from '@core/infrastructure/appConfig/AppConfig';
import { CurrencyConverter } from '@core/infrastructure/currency/currencyConverter/currencyConverter';
import { CurrencyRates } from '@core/infrastructure/currency/currencyRates/CurrencyRates';
import { ECurrency } from '@core/infrastructure/currency/types';
import { ELocaleCode } from '@core/infrastructure/intl/enums';
import { IntlService } from '@core/infrastructure/intl/intlService/IntlService';

import { Container } from '@modules/serviceContainer/container';
import { EServiceToken } from '@modules/serviceContainer/types';
import { NumberParser } from '@core/infrastructure/intl/numberParser/NumberParser';
import { idGeneratorFactory } from '@core/infrastructure/idGenerator/factory';
import { ClientIdStorage } from '@core/infrastructure/clientIdStorage/ClientIdStorage';
import { ClientId } from '@core/infrastructure/clientId/ClientId';

let globalContainer: Container;

export function createDIContainer(options?: { isGlobal?: boolean }) {
	let container = new Container();

	if (options?.isGlobal) {
		globalContainer = container;
	}

	container.register(
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
			token: EServiceToken.INTL_SERVICE,
			useClass: IntlService,
			deps: [EServiceToken.APP_CONFIG, EServiceToken.NUMBER_PARSER],
		},
		{
			token: EServiceToken.CURRENCY_CONVERTER,
			useFactory: () => {
				let currencyRates = CurrencyRates.getInstance();

				return new CurrencyConverter(currencyRates);
			},
		},
		{
			token: EServiceToken.NUMBER_PARSER,
			useClass: NumberParser,
			deps: [EServiceToken.APP_CONFIG],
		},

		{
			token: EServiceToken.ID_GENERATOR,
			useFactory: idGeneratorFactory,
		},
		{
			token: EServiceToken.CLIENT_ID_STORAGE,
			useFactory: () => new ClientIdStorage(ClientIdStorage.STORAGE_ID),
		},
		{
			token: EServiceToken.CLIENT_ID,
			useClass: ClientId,
			deps: [EServiceToken.ID_GENERATOR, EServiceToken.CLIENT_ID_STORAGE],
		},
	);

	return container;
}

export function getGlobalContainer(): Container {
	if (!globalContainer) {
		throw new Error('GlobalContainer Not Initialized');
	}

	return globalContainer;
}
