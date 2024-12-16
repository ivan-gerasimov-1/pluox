import { CurrencyRatesNotAvailableError } from '@root/core/modules/currency/infrastructure/currencyRatesDataSource/errors';
import type { ICurrencyRatesDataSource } from '@root/core/modules/currency/infrastructure/currencyRatesDataSource/types';
import { LocalStorageDataSource } from '@root/core/infrastructure/dataSource/dataSource';
import type {
	ECurrency,
	TCurrencyRates,
} from '@root/core/modules/currency/domain/types';

export class CurrencyRatesDataSource
	extends LocalStorageDataSource<TCurrencyRates>
	implements ICurrencyRatesDataSource
{
	static readonly #STORAGE_ID = 'currencyRates';

	constructor() {
		super(CurrencyRatesDataSource.#STORAGE_ID);
	}

	/**
	 * @throws {CurrencyRatesNotAvailableError}
	 */
	public findAll(): TCurrencyRates {
		let currencyRates = this.read();

		if (!currencyRates) {
			throw new CurrencyRatesNotAvailableError();
		}

		return currencyRates;
	}

	public find(currency: ECurrency): number {
		let rates = this.findAll();

		return rates[currency];
	}

	public save(rates: TCurrencyRates): void {
		this.update(rates);
	}

	public exists(currency: ECurrency): boolean {
		if (this.isEmpty()) {
			return false;
		}

		return !!this.find(currency);
	}
}
