import type { ICurrencyRateService } from '@root/core/modules/currency/application/currencyRateService/types';
import type { TCurrency } from '@root/core/modules/currency/domain/types';
import type { ICurrencyConverter } from '@root/core/modules/currency/application/currencyConverter/types';
import type { ICurrencyRateRepository } from '@root/core/modules/currency/domain/currencyRateRepository/currencyRateRepository';

export class CurrencyRateService implements ICurrencyRateService {
	constructor(
		private readonly currencyRateRepository: ICurrencyRateRepository,
		private readonly currencyConverter: ICurrencyConverter,
	) {}

	public get(currency: TCurrency): number {
		return this.currencyRateRepository.findRateByCode(currency);
	}

	public convert(amount: number, from: TCurrency, to: TCurrency): number {
		return this.currencyConverter.convert(amount, from, to);
	}
}
