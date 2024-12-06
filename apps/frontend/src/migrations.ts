import { ECurrency } from '@core/infrastructure/currency/types';
import { EServiceToken } from '@modules/serviceContainer/types';
import { getGlobalContainer } from '@root/diContainer';

export function runMigrations() {
	addThaiBahtCurrencyToStoredAppConfig();
}

/**
 * №1. Add THB to stored appConfig
 */
export function addThaiBahtCurrencyToStoredAppConfig() {
	let globalContainer = getGlobalContainer();

	let appConfigStorage = globalContainer.get(EServiceToken.APP_CONFIG_STORAGE);
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
