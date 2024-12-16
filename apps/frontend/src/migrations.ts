import { ECurrency } from '@root/core/modules/currency/domain/types';

import { resolveService } from '@root/core/infrastructure/serviceContainer/resolveService';
import { EServiceToken } from '@root/core/infrastructure/serviceContainer/types';

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
