import type { ICurrencyRatesService } from '@root/core/modules/currency/application/currencyRatesService/types';
import type { ICurrencyRatesDataSource } from '@root/core/modules/currency/infrastructure/currencyRatesDataSource/types';
import type { ECurrency } from '@root/core/modules/currency/domain/types';
import type { ICurrencyConverter } from '@root/core/modules/currency/application/currencyConverter/types';

export class CurrencyRatesService implements ICurrencyRatesService {
	constructor(
		private readonly currencyRatesDataSource: ICurrencyRatesDataSource,
		private readonly currencyConverter: ICurrencyConverter,
	) {}

	public get(currency: ECurrency): number {
		return this.currencyRatesDataSource.find(currency);
	}

	public convert(amount: number, from: ECurrency, to: ECurrency): number {
		return this.currencyConverter.convert(amount, from, to);
	}
}
