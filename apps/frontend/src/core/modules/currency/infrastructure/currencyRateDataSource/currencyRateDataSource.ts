import { CurrencyRatesNotAvailableError } from '@root/core/modules/currency/infrastructure/currencyRateDataSource/errors';
import type { ICurrencyRateDataSource } from '@root/core/modules/currency/infrastructure/currencyRateDataSource/types';
import { LocalStorageDataSource } from '@root/core/infrastructure/dataSource/dataSource';
import type {
	ECurrency,
	TCurrencyRates,
} from '@root/core/modules/currency/domain/types';

export class CurrencyRateDataSource
	extends LocalStorageDataSource<TCurrencyRates>
	implements ICurrencyRateDataSource
{
	static readonly #STORAGE_ID = 'currencyRates';

	constructor() {
		super(CurrencyRateDataSource.#STORAGE_ID);
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
