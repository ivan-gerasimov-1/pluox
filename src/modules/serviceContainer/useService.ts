import {
	AppConfig,
	type IAppConfig,
} from '@core/infrastructure/appConfig/AppConfig';
import { CurrencyConverter } from '@core/infrastructure/currency/currencyConverter/currencyConverter';
import type { ICurrencyConverter } from '@core/infrastructure/currency/currencyConverter/types';
import { IntlService } from '@core/infrastructure/intl/intlService/IntlService';
import type { IIntlService } from '@core/infrastructure/intl/intlService/types';

export const enum EService {
	INTL = 1,
	CURRENCY_CONVERTER,
	APP_CONFIG,
}

export interface IServiceMap {
	[EService.INTL]: IIntlService;
	[EService.CURRENCY_CONVERTER]: ICurrencyConverter;
	[EService.APP_CONFIG]: IAppConfig;
}

const serviceContainer = {
	[EService.INTL]: IntlService,
	[EService.CURRENCY_CONVERTER]: CurrencyConverter,
	[EService.APP_CONFIG]: AppConfig,
};

export function useService<T extends keyof IServiceMap = keyof IServiceMap>(
	serviceId: T,
): IServiceMap[T] {
	const service = serviceContainer[serviceId] as unknown as IServiceMap[T];

	return (
		service
			// @ts-expect-error
			.getInstance()
	);
}
