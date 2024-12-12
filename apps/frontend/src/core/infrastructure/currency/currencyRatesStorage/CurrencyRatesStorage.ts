import type { TCurrencyRates } from '@core/infrastructure/currency/currencyRates/types';
import { CurrencyRatesNotAvailableError } from '@core/infrastructure/currency/currencyRatesStorage/errors';
import type { ICurrencyRatesStorage } from '@core/infrastructure/currency/currencyRatesStorage/types';
import { LocalStorageDataSource } from '@core/infrastructure/appStorage/AppStorage';
import type { ECurrency } from '@core/infrastructure/currency/types';

export class CurrencyRatesStorage
	extends LocalStorageDataSource<TCurrencyRates>
	implements ICurrencyRatesStorage
{
	static readonly #STORAGE_ID = 'currencyRates';

	constructor() {
		super(CurrencyRatesStorage.#STORAGE_ID);
	}

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
