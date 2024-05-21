import { AppConfigService } from '@core/infrastructure/appConfigService/AppConfigService';
import { AppConfigStorage } from '@core/infrastructure/appConfigStorage/AppConfigStorage';
import { BackupService } from '@core/infrastructure/backupService/BackupService';
import { CurrencyRatesAPI } from '@core/infrastructure/currency/currencyRatesAPI/CurrencyRatesAPI';
import { CurrencyRatesStorage } from '@core/infrastructure/currency/currencyRatesStorage/CurrencyRatesStorage';
import { ECurrency } from '@core/infrastructure/currency/types';
import { ExpensesStorage } from '@core/infrastructure/expensesStorage/ExpensesStorage';
import { Expenses } from '@domain/expenses/expenses';
import { ReactUI, type IUserInterface } from '@root/createUI';
import { runMockServiceWorker } from '@root/mockServiceWorker/run';
import { registerServiceWorker } from '@root/serviceWorker';

async function main(): Promise<void> {
	await runMockServiceWorker();

	runMigrations();

	loadAppConfig();

	runBackup();
	await getCurrencyRates();
	loadExpenses();

	const ui: IUserInterface = new ReactUI(window, {
		containerId: 'root',
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

async function runBackup(): Promise<void> {
	let expensesStorage = ExpensesStorage.getInstance();
	let expenses = expensesStorage.getItems();

	return BackupService.getInstance().run(expenses);
}

function loadAppConfig(): void {
	AppConfigService.getInstance().initialize();
}

function loadExpenses(): void {
	let rawExpenses = ExpensesStorage.getInstance().getItems();

	Expenses.getInstance().__addRawExpenses(rawExpenses);
}

function runMigrations() {
	/** №1. Add THB to stored appConfig */
	function addThaiBahtCurrencyToStoredAppConfig() {
		let appConfigStorage = AppConfigStorage.getInstance();
		let appConfig = appConfigStorage.load();

		if (!appConfig) {
			return;
		}

		if (appConfig.availabelCurrencies.includes(ECurrency.THB)) {
			return;
		}

		appConfig.availabelCurrencies.push(ECurrency.THB);
		appConfigStorage.save(appConfig);
	}

	addThaiBahtCurrencyToStoredAppConfig();
}
