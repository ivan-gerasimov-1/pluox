import { type TCurrencyRates } from '@domain/currency/currencyRates/types';
import { ECurrency } from '@domain/expense/types';

export const CURRENCY_RATE: TCurrencyRates = {
	[ECurrency.RUB]: 90,
	[ECurrency.USD]: 1,
	[ECurrency.GEL]: 2.61,
};
