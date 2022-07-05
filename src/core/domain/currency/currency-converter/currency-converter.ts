import { CURRENCY_RATE } from '@domain/currency/currency-converter/constants';
import { type ICurrencyConverter } from '@domain/currency/currency-converter/types';
import { ECurrency } from '@domain/expense/types';

export class CurrencyConverter implements ICurrencyConverter {
	private constructor() {}

	public static create(): ICurrencyConverter {
		return new CurrencyConverter();
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

		return amountInUsd * CURRENCY_RATE[to];
	}

	private convertToUsd(amount: number, from: ECurrency): number {
		return amount / CURRENCY_RATE[from];
	}
}
