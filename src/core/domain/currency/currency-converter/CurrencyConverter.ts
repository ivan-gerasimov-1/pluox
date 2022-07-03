import { CURRENCY_RATE_TO_RUB } from '@domain/currency/currency-converter/constants';
import { type ICurrencyConverter } from '@domain/currency/currency-converter/types';
import { ECurrency } from '@domain/expense/types';

export class CurrencyConverter implements ICurrencyConverter {
	private constructor() {}

	public static create(): ICurrencyConverter {
		return new CurrencyConverter();
	}

	public convertToRub(amount: number, from: ECurrency): number {
		let amountInRub: number;

		if (from === ECurrency.RUB) {
			amountInRub = amount;
		} else {
			amountInRub = amount * CURRENCY_RATE_TO_RUB[from];
		}

		return amountInRub;
	}
}
