import type { ICurrencyConverter } from '@/core/modules/currency/application/currencyConverter/types';
import type { ICurrencyRateService } from '@/core/modules/currency/application/currencyRateService/types';
import type { ICurrencyRateRepository } from '@/core/modules/currency/domain/currencyRateRepository/currencyRateRepository';
import type { TCurrency } from '@/core/modules/currency/domain/types';

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
