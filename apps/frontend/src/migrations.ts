import { AppConfigStorage } from '@core/infrastructure/appConfigStorage/AppConfigStorage';
import { ECurrency } from '@core/infrastructure/currency/types';

export function runMigrations() {
	addThaiBahtCurrencyToStoredAppConfig();
}

/**
 * №1. Add THB to stored appConfig
 */
export function addThaiBahtCurrencyToStoredAppConfig() {
	let appConfigStorage = AppConfigStorage.getInstance();
	let appConfig = appConfigStorage.get();

	if (!appConfig) {
		return;
	}

	if (appConfig.availabelCurrencies.includes(ECurrency.THB)) {
		return;
	}

	appConfig.availabelCurrencies.push(ECurrency.THB);
	appConfigStorage.set(appConfig);
}
