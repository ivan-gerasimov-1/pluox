import { QueryClient } from '@tanstack/react-query';

import { AppConfigService } from '@core/infrastructure/appConfigService/AppConfigService';
import { ReactUI, type IUserInterface } from '@root/createUI';
import { runMigrations } from '@root/migrations';
import { runMockServiceWorker } from '@root/mockServiceWorker/run';
import { createAppRouter } from '@root/router';
import { registerServiceWorker } from '@root/serviceWorker';

import { CurrencyRatesAPI } from '@core/infrastructure/currency/currencyRatesAPI/CurrencyRatesAPI';
import { CurrencyRatesStorage } from '@core/infrastructure/currency/currencyRatesStorage/CurrencyRatesStorage';
import { ECurrency } from '@core/infrastructure/currency/types';
import { ExpensesStorage } from '@core/infrastructure/expensesStorage/ExpensesStorage';

import { Expenses } from '@domain/expenses/expenses';

import { createDIContainer } from '@root/diContainer';

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
	let currencyRatesStorage = CurrencyRatesStorage.getInstance();
	let hasAllCurrencies = Object.values(ECurrency).every((currency) => {
		return currencyRatesStorage.has(currency);
	});

	if (!currencyRatesStorage.isEmpty() && hasAllCurrencies) {
		return;
	}

	let result = await CurrencyRatesAPI.getInstance() //
		.get();

	currencyRatesStorage.setRates(result);
}

function loadAppConfig(): void {
	AppConfigService.getInstance().initialize();
}

function loadExpenses(): void {
	let rawExpenses = ExpensesStorage.getInstance().getItems();

	Expenses.getInstance().__addRawExpenses(rawExpenses);
}
