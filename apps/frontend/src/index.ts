import { QueryClient } from '@tanstack/react-query';

import { ReactUI, type IUserInterface } from '@root/createUI';
import { runMigrations } from '@root/migrations';
import { runMockServiceWorker } from '@root/mockServiceWorker/run';
import { createAppRouter } from '@root/presentation/web-ui/router';
import { registerServiceWorker } from '@root/serviceWorker';

import { ECurrency } from '@core/infrastructure/currency/types';

import { createDIContainer } from '@root/diContainer';
import {
	EServiceToken,
	type IContainer,
} from '@modules/serviceContainer/types';
import { resolveService } from '@modules/serviceContainer/resolveService';

async function main(): Promise<void> {
	let diContainer = createDIContainer({
		isGlobal: true,
	});

	await runMockServiceWorker();

	await runCore();
	await runUI(diContainer);
}

main();

async function runUI(diContainer: IContainer): Promise<void> {
	let queryClient = new QueryClient();
	let appRouter = createAppRouter();

	const ui: IUserInterface = new ReactUI(
		window,
		queryClient,
		appRouter,
		diContainer,
		{
			containerId: 'saveeRoot',
		},
	);

	registerServiceWorker();

	await ui.render();
}

async function runCore(): Promise<void> {
	runMigrations();

	loadAppConfig();
	await getCurrencyRates();
	loadExpenses();
}

async function getCurrencyRates(): Promise<void> {
	let currencyRatesAPI = resolveService(EServiceToken.CURRENCY_RATES_API);
	let currencyRatesStorage = resolveService(
		EServiceToken.CURRENCY_RATES_STORAGE,
	);

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
	let appConfigService = resolveService(EServiceToken.APP_CONFIG_SERVICE);

	appConfigService.initialize();
}

function loadExpenses(): void {
	let expenses = resolveService(EServiceToken.EXPENSES);
	let expensesStorage = resolveService(EServiceToken.EXPENSES_STORAGE);

	let rawExpenses = expensesStorage.getItems();

	expenses.__addRawExpenses(rawExpenses);
}
