import { CurrencyRatesNotAvailableError } from '@root/core/modules/currency/infrastructure/currencyRatesStorage/errors';
import type { ICurrencyRatesStorage } from '@root/core/modules/currency/infrastructure/currencyRatesStorage/types';
import { LocalStorageDataSource } from '@root/core/infrastructure/dataSource/dataSource';
import type {
	ECurrency,
	TCurrencyRates,
} from '@root/core/modules/currency/domain/types';

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
