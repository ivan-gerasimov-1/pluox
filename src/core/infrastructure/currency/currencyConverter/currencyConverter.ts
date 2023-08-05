import { type ICurrencyConverter } from '@core/infrastructure/currency/currencyConverter/types';
import {
	CurrencyRates,
	type ICurrencyRates,
} from '@core/infrastructure/currency/currencyRates/CurrencyRates';
import { ECurrency } from '@domain/expense/types';

export class CurrencyConverter implements ICurrencyConverter {
	static #instance?: ICurrencyConverter;

	private constructor(private readonly currencyRates: ICurrencyRates) {}

	public static create(): ICurrencyConverter {
		if (!this.#instance) {
			const currencyRates = CurrencyRates.create();

			this.#instance = new CurrencyConverter(currencyRates);
		}

		return this.#instance;
	}

	/**
	 * RUB → GEL = RUB → USD → GEL
	 * GEL → RUB = GEL → USD → RUB
	 * GEL → USD
	 * USD → GEL
	 */
	public convert(amount: number, from: ECurrency, to: ECurrency): number {
		let amountInUsd: number;

		if (from === ECurrency.USD) {
			amountInUsd = amount;
		} else {
			amountInUsd = this.convertToUsd(amount, from);
		}

		if (to === ECurrency.USD) {
			return amountInUsd;
		}

		return amountInUsd * this.currencyRates.get(to);
	}

	private convertToUsd(amount: number, from: ECurrency): number {
		return amount / this.currencyRates.get(from);
	}
}
