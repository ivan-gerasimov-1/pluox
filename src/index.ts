import { CurrencyRatesAPI } from '@core/infrastructure/currency/currencyRatesAPI/CurrencyRatesAPI';
import { CurrencyRatesStorage } from '@core/infrastructure/currency/currencyRatesStorage/CurrencyRatesStorage';
import { ReactUI, type IUserInterface } from '@root/createUI';
import { registerServiceWorker } from '@root/serviceWorker';
import { initializeSupabase } from '@root/supabase';

async function main(): Promise<void> {
	try {
		await initializeSupabase();
	} finally {
		console.warn('Supabase connection is failed');
	}

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
