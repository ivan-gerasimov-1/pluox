import { AppStorage } from '@core/infrastructure/appStorage/AppStorage';
import { BackupService } from '@core/infrastructure/backupService/BackupService';
import { CurrencyRatesAPI } from '@core/infrastructure/currency/currencyRatesAPI/CurrencyRatesAPI';
import { CurrencyRatesStorage } from '@core/infrastructure/currency/currencyRatesStorage/CurrencyRatesStorage';
import { environment } from '@root/config';
import { ReactUI, type IUserInterface } from '@root/createUI';
import { registerServiceWorker } from '@root/serviceWorker';

async function main(): Promise<void> {
	await testApiCall();
	runBackup();

	await getCurrencyRates();

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
	let appStorage = new AppStorage();
	let store = appStorage.get('store/$expenses');

	if (!store) {
		return;
	}

	return BackupService.getInstance().run(
		// @ts-expect-error
		store?.state?.operations,
	);
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
