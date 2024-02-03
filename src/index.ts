import { BackupService } from '@core/infrastructure/backupService/BackupService';
import { CurrencyRatesAPI } from '@core/infrastructure/currency/currencyRatesAPI/CurrencyRatesAPI';
import { CurrencyRatesStorage } from '@core/infrastructure/currency/currencyRatesStorage/CurrencyRatesStorage';
import { ExpensesStorage } from '@core/infrastructure/expensesStorage/ExpensesStorage';
import { Expenses } from '@domain/expenses/expenses';
import { environment } from '@root/config';
import { ReactUI, type IUserInterface } from '@root/createUI';
import { registerServiceWorker } from '@root/serviceWorker';

async function main(): Promise<void> {
	/** @todo Remove */
	// await testApiCall();
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

	if (!currencyRatesStorage.isEmpty()) {
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

async function testApiCall(): Promise<void> {
	try {
		const foo = await fetch(environment.apiUrl);

		window.alert(JSON.stringify(await foo.json()));
	} catch (error) {
		// @ts-expect-error
		console.log(error.message);

		window.alert(error);
	}
}

function loadExpenses(): void {
	let rawExpenses = ExpensesStorage.getInstance().getItems();

	Expenses.getInstance().__addRawExpenses(rawExpenses);
}
