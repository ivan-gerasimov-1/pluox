import { QueryClient } from '@tanstack/react-query';

import { runMigrations } from '@root/migrations';
import { AppConfigService } from '@core/infrastructure/appConfigService/AppConfigService';
import { registerServiceWorker } from '@root/serviceWorker';
import { runMockServiceWorker } from '@root/mockServiceWorker/run';
import { ReactUI, type IUserInterface } from '@root/createUI';

import { CurrencyRatesAPI } from '@core/infrastructure/currency/currencyRatesAPI/CurrencyRatesAPI';
import { CurrencyRatesStorage } from '@core/infrastructure/currency/currencyRatesStorage/CurrencyRatesStorage';
import { ECurrency } from '@core/infrastructure/currency/types';
import { ExpensesStorage } from '@core/infrastructure/expensesStorage/ExpensesStorage';

import { Expenses } from '@domain/expenses/expenses';

async function main(): Promise<void> {
	await runMockServiceWorker();

	runMigrations();
	loadAppConfig();
	await getCurrencyRates();
	loadExpenses();

	const ui: IUserInterface = new ReactUI(window, new QueryClient(), {
		containerId: 'saveeRoot',
	});

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
