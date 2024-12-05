import type { IAppConfig } from '@core/infrastructure/appConfig/AppConfig';
import type { ICurrencyConverter } from '@core/infrastructure/currency/currencyConverter/types';
import type { IIdGenerator } from '@core/infrastructure/idGenerator/types';
import type { IIntlService } from '@core/infrastructure/intl/intlService/types';
import type { NumberParser } from '@core/infrastructure/intl/numberParser/NumberParser';
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
}

export interface IServiceMap {
	[EServiceToken.ENVIRONMENT]: TEnvironment;
	[EServiceToken.INTL_SERVICE]: IIntlService;
	[EServiceToken.CURRENCY_CONVERTER]: ICurrencyConverter;
	[EServiceToken.APP_CONFIG]: IAppConfig;
	[EServiceToken.NUMBER_PARSER]: NumberParser;
	[EServiceToken.ID_GENERATOR]: IIdGenerator;
}
