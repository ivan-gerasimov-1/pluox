import type { ICurrencyConverter } from '@core/modules/currency/application/currencyConverter/types';
import type { ICurrencyRateRepository } from '@core/modules/currency/domain/currencyRateRepository/currencyRateRepository';
import { ECurrency, type TCurrency } from '@core/modules/currency/domain/types';

export class CurrencyConverter implements ICurrencyConverter {
	constructor(
		private readonly currencyRateRepository: ICurrencyRateRepository,
	) {}

	/**
	 * RUB → GEL = RUB → USD → GEL
	 * GEL → RUB = GEL → USD → RUB
	 * GEL → USD
	 * USD → GEL
	 */
	public convert(amount: number, from: TCurrency, to: TCurrency): number {
		let amountInUsd: number;

		if (from === ECurrency.USD) {
			amountInUsd = amount;
		} else {
			amountInUsd = this.convertToUsd(amount, from);
		}

		if (to === ECurrency.USD) {
			return amountInUsd;
		}

		return amountInUsd * this.currencyRateRepository.findRateByCode(to);
	}

	private convertToUsd(amount: number, from: TCurrency): number {
		return amount / this.currencyRateRepository.findRateByCode(from);
	}
}
