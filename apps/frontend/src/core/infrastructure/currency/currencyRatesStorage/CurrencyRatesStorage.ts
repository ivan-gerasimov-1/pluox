import type { TCurrencyRates } from '@core/infrastructure/currency/currencyRates/types';
import { CurrencyRatesNotAvailableError } from '@core/infrastructure/currency/currencyRatesStorage/errors';
import type { ICurrencyRatesStorage } from '@core/infrastructure/currency/currencyRatesStorage/types';
import { AppStorage } from '@core/infrastructure/appStorage/AppStorage';
import type { ECurrency } from '@core/infrastructure/currency/types';

export class CurrencyRatesStorage
	extends AppStorage<TCurrencyRates>
	implements ICurrencyRatesStorage
{
	public static readonly STORAGE_ID = 'currencyRates';

	/**
	 * @throws {CurrencyRatesNotAvailableError}
	 */
	public getRates(): TCurrencyRates {
		let currencyRates = this.read();

		if (!currencyRates) {
			throw new CurrencyRatesNotAvailableError();
		}

		return currencyRates;
	}

	public setRates(rates: TCurrencyRates): void {
		this.update(rates);
	}

	public has(currency: ECurrency): boolean {
		if (this.isEmpty()) {
			return false;
		}

		let rates = this.getRates();

		return !!rates[currency];
	}
}
