import { type TCurrencyRates } from '@core/infrastructure/currency/currencyRates/types';
import { CurrencyRatesNotAvailableError } from '@core/infrastructure/currency/currencyRatesStorage/errors';
import { type ICurrencyRatesStorage } from '@core/infrastructure/currency/currencyRatesStorage/types';
import { AppStorage } from '@core/infrastructure/appStorage/AppStorage';
import type { ECurrency } from '@core/infrastructure/currency/types';

export class CurrencyRatesStorage
	extends AppStorage<TCurrencyRates>
	implements ICurrencyRatesStorage
{
	static #instance?: ICurrencyRatesStorage;

	readonly #STORAGE_ID = 'currencyRates';

	private constructor() {
		super();
	}

	public static getInstance(): ICurrencyRatesStorage {
		if (!this.#instance) {
			this.#instance = new CurrencyRatesStorage();
		}

		return this.#instance;
	}

	public override get(): TCurrencyRates | null {
		return super.get(this.#STORAGE_ID);
	}

	/**
	 * @throws {CurrencyRatesNotAvailableError}
	 */
	public getRates(): TCurrencyRates {
		let currencyRates = this.get();

		if (!currencyRates) {
			throw new CurrencyRatesNotAvailableError();
		}

		return currencyRates;
	}

	public setRates(rates: TCurrencyRates): void {
		this.set(this.#STORAGE_ID, rates);
	}

	public isEmpty(): boolean {
		return this.get() === null;
	}

	public has(currency: ECurrency): boolean {
		if (this.isEmpty()) {
			return false;
		}

		let rates = this.getRates();

		return !!rates[currency];
	}
}
