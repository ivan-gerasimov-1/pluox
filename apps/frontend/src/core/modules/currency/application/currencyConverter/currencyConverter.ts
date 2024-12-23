import type { ICurrencyConverter } from '@root/core/modules/currency/application/currencyConverter/types';
import type { ICurrencyRateRepository } from '@root/core/modules/currency/domain/currencyRateRepository/currencyRateRepository';

import { ECurrency } from '@root/core/modules/currency/domain/types';

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

		return amountInUsd * this.currencyRateRepository.findByCode(to).rate;
	}

	private convertToUsd(amount: number, from: ECurrency): number {
		return amount / this.currencyRateRepository.findByCode(from).rate;
	}
}
