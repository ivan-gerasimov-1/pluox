import { createDIContainer } from '@root/diContainer';
import { createUI } from '@root/presentation/web-ui';
import { runMigrations } from '@root/migrations';
import { runMockServiceWorker } from '@root/mockServiceWorker/run';
import { registerServiceWorker } from '@root/serviceWorker';

import { ECurrency } from '@root/core/modules/currency/domain/types';

import {
	EServiceToken,
	type IContainer,
} from '@root/core/infrastructure/serviceContainer/types';
import { resolveService } from '@root/core/infrastructure/serviceContainer/resolveService';

async function main(): Promise<void> {
	let diContainer = createDIContainer({
		isGlobal: true,
	});

	await runCore();
	await runUI(diContainer);
}

main();

async function runUI(diContainer: IContainer): Promise<void> {
	const ui = createUI(diContainer);

	registerServiceWorker();

	await ui.start();
}

async function runCore(): Promise<void> {
	await runMockServiceWorker();

	runMigrations();

	loadAppConfig();
	await getCurrencyRates();
}

async function getCurrencyRates(): Promise<void> {
	let currencyRateAPI = resolveService(EServiceToken.CURRENCY_RATE_API);
	let currencyRateDataSource = resolveService(
		EServiceToken.CURRENCY_RATE_DATASOURCE,
	);

	let hasAllCurrencies = Object.values(ECurrency).every((currency) => {
		return currencyRateDataSource.exists(currency);
	});

	if (!currencyRateDataSource.isEmpty() && hasAllCurrencies) {
		return;
	}

	let currencyRates = await currencyRateAPI.get();

	currencyRateDataSource.save(currencyRates);
}

function loadAppConfig(): void {
	let appConfigService = resolveService(EServiceToken.APP_CONFIG_SERVICE);

	appConfigService.initialize();
}
