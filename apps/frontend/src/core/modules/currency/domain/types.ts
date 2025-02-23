import type { TValueOf } from '@root/core/types';

export const ECurrency = {
	EUR: 'EUR',
	GEL: 'GEL',
	RUB: 'RUB',
	USD: 'USD',
	THB: 'THB',
} as const;

export type TCurrency = TValueOf<typeof ECurrency>;

export type TCurrencyRates = Record<TCurrency, number>;
