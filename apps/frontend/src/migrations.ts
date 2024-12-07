import { ECurrency } from '@core/infrastructure/currency/types';

import { resolveService } from '@modules/serviceContainer/resolveService';
import { EServiceToken } from '@modules/serviceContainer/types';

export function runMigrations() {
	addThaiBahtCurrencyToStoredAppConfig();
}

/**
 * №1. Add THB to stored appConfig
 */
export function addThaiBahtCurrencyToStoredAppConfig() {
	let appConfigStorage = resolveService(EServiceToken.APP_CONFIG_STORAGE);
	let appConfig = appConfigStorage.read();

	if (!appConfig) {
		return;
	}

	if (appConfig.availabelCurrencies.includes(ECurrency.THB)) {
		return;
	}

	appConfig.availabelCurrencies.push(ECurrency.THB);
	appConfigStorage.update(appConfig);
}
