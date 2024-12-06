import { QueryClient } from '@tanstack/react-query';

import { ReactUI, type IUserInterface } from '@root/createUI';
import { runMigrations } from '@root/migrations';
import { runMockServiceWorker } from '@root/mockServiceWorker/run';
import { createAppRouter } from '@root/router';
import { registerServiceWorker } from '@root/serviceWorker';

import { CurrencyRatesStorage } from '@core/infrastructure/currency/currencyRatesStorage/CurrencyRatesStorage';
import { ECurrency } from '@core/infrastructure/currency/types';

import { createDIContainer, getGlobalContainer } from '@root/diContainer';
import { EServiceToken } from '@modules/serviceContainer/types';

async function main(): Promise<void> {
	await runMockServiceWorker();

	createDIContainer({
		isGlobal: true,
	});

	runMigrations();

	loadAppConfig();
	await getCurrencyRates();
	loadExpenses();

	const ui: IUserInterface = new ReactUI(
		window,
		new QueryClient(),
		createAppRouter(),
		{
			containerId: 'saveeRoot',
		},
	);

	registerServiceWorker();

	await ui.render();
}

main();

async function getCurrencyRates(): Promise<void> {
	let globalContainer = getGlobalContainer();
	let currencyRatesAPI = globalContainer.get(EServiceToken.CURRENCY_RATES_API);

	let currencyRatesStorage = CurrencyRatesStorage.getInstance();
	let hasAllCurrencies = Object.values(ECurrency).every((currency) => {
		return currencyRatesStorage.has(currency);
	});

	if (!currencyRatesStorage.isEmpty() && hasAllCurrencies) {
		return;
	}

	let result = await currencyRatesAPI //
		.get();

	currencyRatesStorage.setRates(result);
}

function loadAppConfig(): void {
	let globalContainer = getGlobalContainer();
	let appConfigService = globalContainer.get(EServiceToken.APP_CONFIG_SERVICE);

	appConfigService.initialize();
}

function loadExpenses(): void {
	let globalContainer = getGlobalContainer();

	let expenses = globalContainer.get(EServiceToken.EXPENSES);
	let expensesStorage = globalContainer.get(EServiceToken.EXPENSES_STORAGE);

	let rawExpenses = expensesStorage.getItems();

	expenses.__addRawExpenses(rawExpenses);
}
