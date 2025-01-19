import type { TAppConfig } from '@root/core/modules/settings/domain/appConfig/types';
import { resolveService } from '@root/core/infrastructure/serviceContainer/resolveService';
import type { TMonth } from '@root/core/domain/temporal/types';
import { EServiceToken } from '@root/presentation/web-ui/modules/serviceContainer/enums';

export const APP_CONFIG_QUERY = 'appConfigQuery';
export const APP_CONFIG_QUERY_BUDGET = 'appConfigQueryBudget';
export const APP_CONFIG_QUERY_MONTH = 'appConfigQueryMonth';

export function getAppConfig(): TAppConfig {
	let appConfig = resolveService(EServiceToken.APP_CONFIG);

	return {
		locale: appConfig.locale,
		budget: appConfig.budget,
		currency: appConfig.currency,
		availabelCurrencies: appConfig.availableCurrencies,
	};
}

export function getBudget(): number {
	let appConfig = resolveService(EServiceToken.APP_CONFIG);

	return appConfig.budget ?? 0;
}

export function getMonth(): TMonth {
	let temporal = resolveService(EServiceToken.TEMPORAL);

	return temporal.getCurrentMonth();
}

export function updateAppConfig(payload: Partial<TAppConfig>): TAppConfig {
	let appConfigService = resolveService(EServiceToken.APP_CONFIG_SERVICE);

	return appConfigService.update({
		locale: payload.locale,
		budget: payload.budget,
		currency: payload.currency,
	});
}
