import type { ICurrencyRateService } from '@root/core/modules/currency/application/currencyRateService/types';
import type { ECurrency } from '@root/core/modules/currency/domain/types';
import type { ICurrencyConverter } from '@root/core/modules/currency/application/currencyConverter/types';
import type { ICurrencyRateRepository } from '@root/core/modules/currency/domain/currencyRateRepository/currencyRateRepository';

export class CurrencyRateService implements ICurrencyRateService {
	constructor(
		private readonly currencyRateRepository: ICurrencyRateRepository,
		private readonly currencyConverter: ICurrencyConverter,
	) {}

	public get(currency: ECurrency): number {
		return this.currencyRateRepository.findRateByCode(currency);
	}

	public convert(amount: number, from: ECurrency, to: ECurrency): number {
		return this.currencyConverter.convert(amount, from, to);
	}
}
